/*
Hannah Guillen, UMass Lowell Computer Science
  hannah_guillen@student.uml.edu, hguillen@cs.uml.edu
Date: November 29, 2022
File: script.js
GUI Assignment: Using jQuery Plugin/UI with Dynamic Table
  This JavaScript file contains all necessary functions for the table.
  Includes updated jQuery Validation plugins for tabs and sliders.

Copyright (c) 2022 by Hannah Guillen. All rights reserved. May be freely
copied or excerpted for educational purposes with credit to the author.
*/

function setArray(min, max) {
  let array = [];     // First value in array is 0
  if (min !== 0) {
    array.push(0);
  }
  for (let i = min; i <= max; i++) {
    array.push(i);
  }
  return array;
}
let count = 1;  // Tab counter
function genTable(tCount, min_c, max_c, min_r, max_r) {

  const table = document.createElement(`table-${tCount}`);


  // Initialize arrays
  const colArray = setArray(min_c, max_c);
  const rowArray = setArray(min_r, max_r);

  for (let i = 0; i < rowArray.length; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < colArray.length; j++) {
      const column = document.createElement('td');

      // Multiply given values
      let val = rowArray[i] * colArray[j];

      // Set initial row and column
      if (i === 0 || j === 0) {
        val = rowArray[i] || colArray[j];
        column.classList.add('initial_xy');
      }

      // Leave first cell blank
      if (i === 0 && j === 0) val = '';

      column.innerHTML = val;
      row.appendChild(column);
    }
    table.appendChild(row);
  }
  return table;
}

// jQuery sliders and tabs
$().ready(function () {
  $(function () {
    $("#minc_s").slider({
      value: 1,
      min: -50,
      max: 50,
      slide: function (event, ui) {
        $("#min_c").val(ui.value);
        if (count > 1) {
          refresh();
        }
      }
    });
    $("#maxc_s").slider({
      value: 1,
      min: -50,
      max: 50,
      slide: function (event, ui) {
        $("#max_c").val(ui.value);
        if (count > 1) {
          refresh();
        }
      }
    });
    $("#minr_s").slider({
      value: 1,
      min: -50,
      max: 50,
      slide: function (event, ui) {
        $("#min_r").val(ui.value);
        if (count > 1) {
          refresh();
        }
      }
    });
    $("#maxr_s").slider({
      value: 1,
      min: -50,
      max: 50,
      slide: function (event, ui) {
        $("#max_r").val(ui.value);
        if (count > 1) {
          refresh();
        }
      }
    });
  })

  // jQuery form validation
  $("#signupForm").validate( {
    rules: {
      min_c: {
        required: true,
        range: [-50, 50]
      },
      max_c: {
        required: true,
        range: [-50, 50]
      },
      min_r: {
        required: true,
        range: [-50, 50]
      },
      max_r: {
        required: true,
        range: [-50, 50]
      }
    },
    messages: {
      min_c: {
        required: "Enter a minimum value for the columns.",
        range: "Only enter a number between -50 and 50!",
      },
      max_c: {
        required: "Enter a maximum value for the columns.",
        range: "Only enter a number between -50 and 50!",
      },
      min_r: {
        required: "Enter a minimum value for the rows.",
        range: "Only enter a number between -50 and 50!",
      },
      max_r: {
        required: "Enter a maximum value for the rows.",
        range: "Only enter a number between -50 and 50!",
      },
    }
  });

  $('#signupForm').submit(function (event) {
    event.preventDefault();
    if ($('#signupForm').valid()) {
      newTab();
    }
  });
  $("#newTabs").on('DOMSubtreeModified', function () {
    $("#newTabs").tabs();
  });
});

function newTab() {

  // Store variable values
  const min_c = Number(document.getElementById("min_c").value);
  const max_c = Number(document.getElementById("max_c").value);
  const min_r = Number(document.getElementById("min_r").value);
  const max_r = Number(document.getElementById("max_r").value);

  const table = genTable(count - 1, min_c, max_c, min_r, max_r);

  $("#tLabels").append(
    `<li>
        <a href="#tab-${count}">
            Table Values: [${min_c}, ${max_c}] x [${min_r}, ${max_r}]
        </a>
        <p title="exit" id="btnExit" onclick="removeOption(${count})">x</p>
    </li>`
  )
  $("#tTabs").append(`
    <div class="">
        <span id="tab-item-${count}">
            [${min_c}, ${max_c}] x [${min_r}, ${max_r}]
        </span>
        <input type="checkbox" name="box" id="#table-${count}">
    </div>
  `)
  // New section for tab
  $("#tLabels").after(`<div id="tab-${count}"></div>`);

  $(`#tab-${count}`).append(table);
  $("#newTabs").tabs("refresh");
  count++;

  //const container = document.getElementById("tableBox");
  //container.appendChild(table);

  event.preventDefault();
}
// Refresh page if table has already been created
function refresh() {
  if (document.querySelector(`table-${count - 1}`)) {
    $(`table-${count - 1}`).remove();
  }
  // Store variable values
  const min_c = Number(document.getElementById("min_c").value);
  const max_c = Number(document.getElementById("max_c").value);
  const min_r = Number(document.getElementById("min_r").value);
  const max_r = Number(document.getElementById("max_r").value);

  const table = genTable(count - 1, min_c, max_c, min_r, max_r);

  $(`#tab-${count - 1}`).append(table);
  console.log(`#tab-${count}`);
  $("#newTabs").tabs("refresh");

  // Prevent reload
  event.preventDefault();
}
function removeOption(tabID) {
  let crntTab = "#tab-" + tabID;
  let crntTable = "#tab-item-" + tabID;
  $(crntTab).remove(0);
  $("#newTabs").tabs("refresh");

  let href = "a[href = '" + crntTab + "']";
  $(href).closest("li").remove();
  $(crntTable).parent().remove();
}
function deleteOption() {
  let selected = $('input[name=box]:checked');

  for (let i=0; i < selected.length; i++) {
    let id = $(selected[i]).attr('id');
    var regex = id.replace(/\D/g, "");
    removeOption(regex);
    console.log(selected[i])
    $(selected[i]).parent().remove();
  }
}
