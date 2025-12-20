/* function getLegendsData() {
  const name = "Alan Turing";
  const birthYear = 1912;
  const accomplishments = [];
  accomplishments.push("Cryptanalysis");
  accomplishments.push("Computability and the Turing Test");

  const aCSLegend = {
    name: "Grace Hopper",
    birthYear: 1906,
    accomplishments: ["Compilers", "COBOL"],
  };

  const legends = [
    aCSLegend,
    { name: name, birthYear: birthYear, accomplishments: accomplishments },
  ];

  const aModernCSLegend = {
    name: "Linus Torvalds",
    birthYear: 1969,
    accomplishments: ["Linux", "Git"],
  };
  legends.push(aModernCSLegend);

  return legends;
} */

export function handleConsoleLogTest(showSnackbar) {
  const now = new Date().toLocaleString();
  // showSnackbar('snackbar_console_log_test', `Console Log Test button clicked at:<br>${now}`);
  showSnackbar(
    "snackbar_console_log_test",
    `Console Log Test button clicked at: ${now}`,
  );
  let output = `Console Log Test button clicked at: ${now}\n`;

  /* console.log("Computer Science Legends:");
  const legends = getLegendsData();
  output += "Computer Science Legends:\n";
  legends.forEach(legend => {
    output += `- ${legend.name} (Born: ${legend.birthYear})\n`;
    if (legend.birthYear >= 1950) {
        output += `  Modern Legend: Yes\n`;
    } else {
        output += `  Modern Legend: No\n`;
    }
    output += "  Accomplishments:\n";
    legend.accomplishments.forEach(accomplishment => {
      output += `  - ${accomplishment}\n`;
    });
  }); */

  // Print to textarea and console
  const outputBox = document.getElementById("consoleOutput");
  if (outputBox) {
    outputBox.value = outputBox.value + output;
    outputBox.scrollTop = outputBox.scrollHeight; // Scroll to bottom
  }
  console.log(output);
}
