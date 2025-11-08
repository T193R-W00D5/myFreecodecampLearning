try {
  $pkgPath = Join-Path (Get-Location) 'package.json'
  if (-not (Test-Path $pkgPath)) {
    Write-Host "package.json not found in workspace root; skipping node version check." -ForegroundColor Yellow
    return
  }

  $pkg = Get-Content -Raw $pkgPath | ConvertFrom-Json
  $expected = $pkg.volta.node
  if (-not $expected) {
    Write-Host "No 'volta.node' pin found in package.json; skipping node version check." -ForegroundColor Yellow
    return
  }

  # normalize expected and actual versions (strip leading v)
  $expectedTrim = $expected.ToString().TrimStart('v')
  $nodeRaw = & node -v 2>$null
  if (-not $nodeRaw) {
    Write-Host "Node is not found in PATH. Install or enable Node (Volta, nvm, etc.)." -ForegroundColor Red
    return
  }
  $actual = $nodeRaw.Trim().TrimStart('v')

  if ($actual -eq $expectedTrim) {
    Write-Host "Node version matches pinned version: v$actual" -ForegroundColor Green
  } else {
    Write-Host "WARNING: Node version mismatch." -ForegroundColor Yellow
    Write-Host "  Pinned (package.json volta): v$expectedTrim" -ForegroundColor Yellow
    Write-Host "  Active (PATH): v$actual" -ForegroundColor Yellow
    Write-Host "To fix: run `volta install node@$expectedTrim` and `volta pin node@$expectedTrim` (or adjust your PATH / active manager)." -ForegroundColor Cyan
  }
} catch {
  Write-Host "Error while checking node version: $_" -ForegroundColor Red
}
