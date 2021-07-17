const voted = $('div:contains("Karol")');
let divsVoted = [];
for (let i = 0; i < voted.length; i++) {
  if ($(voted[i])[0].innerHTML === "Karol Conká") {
    divsVoted = [...divsVoted, $(voted[i])];
  }
}

let divVotedParents = [];

for (let i = 0; i < divsVoted.length; i++) {
  divVotedParents = [...divVotedParents, divsVoted[i].parents()];
}

let isJoking = true;
let trueVoted = {};

for (let i = 0; i < divVotedParents.length; i++) {
  if ($(divVotedParents[i]).css("cursor") == "pointer") {
    let parents = $(divVotedParents[i]).parents();
    for (let j = 0; j < parents.length; j++) {
      if (
        $(parents[j]).css("height") === 0 &&
        $(parents[j]).css("top") === "-9999px"
      ) {
        isJoking = true;
        console.log(
          $(parents[j])[0],
          $(parents[j]).css("height"),
          $(parents[j]).css("top")
        );
        break;
      }
    }
    if (!isJoking) {
      //   break
      //   console.log($(trueVoted)[0]);
      // const trueVotedParents = $(divVotedParents[i]).parents()
      // for (let j = 0; j < trueVotedParents.length; i++) {
      //     if($(trueVotedParents[j]).css("cursor") === 'pointer') {
      //         console.log($(trueVotedParents[j])[0]);
      //         // $(trueVotedParents[j])[0].click();
      //         break
      //     }
      // }
    }
  }
}
