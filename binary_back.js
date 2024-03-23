function checkSign(binaryArray) {
    if (binaryArray.length > 0 && binaryArray[0] === '-') {
      return 1; // If first element is '-', return 1
    } else {
      return 0; // Otherwise, return 0
    }
}

function addDecimalIfNeeded(binaryArray) {
    // Convert the binary array to a string
    let binaryString = binaryArray.join('');
  
    // Find the index of the dot in the binary string
    let dotIndex = binaryString.indexOf('.');
  
    if (dotIndex === -1) {
      // If dot is not found, add decimal point and '0' to the end of the array
      let newArray = [...binaryArray, '.', '0'];
      return newArray;
    }
  
    return binaryArray; // Return the original array if dot is already present
  }

  function removeSign(binaryArray) {
    if (binaryArray.length > 0 && binaryArray[0] === '-') {
      // Remove '-' sign by shifting array values to the left
      for (let i = 1; i < binaryArray.length; i++) {
        binaryArray[i - 1] = binaryArray[i];
      }
  
      // Resize the array to remove the last element
      binaryArray.pop();
  
      return binaryArray;
    } else {
      // If no '-' sign is present, return the original array
      return binaryArray;
    }
  }

  function findFirstOneOrDotIndex(binaryArray) {
    for (let i = 0; i < binaryArray.length; i++) {
      if (binaryArray[i] === '1' || binaryArray[i] === '.') {
        return i;
      }
    }
    // If neither '1' nor '.' is found, return -1
    return -1;
    }

  function removeLeadingZeros(binaryArray) {
    const firstOneOrDotIndex = findFirstOneOrDotIndex(binaryArray);
    if (firstOneOrDotIndex === -1) {
      // If neither '1' nor '.' is found, return the original array
      return binaryArray;
    }
  
    const trimmedArray = binaryArray.slice(firstOneOrDotIndex);
    return trimmedArray;
    }

    function findFirstOneIndex(binaryArray) {
        for (let i = 0; i < binaryArray.length; i++) {
          if (binaryArray[i] === '1') {
            return i;
          }
        }
        // If '1' is not found, return -1
        return -1;
    }

    function decimalToBinary(decimal) {
        if (decimal === 0) {
          return "0"; // Special case: if decimal is 0, return "0"
        }
      
        let binaryStringBuilder = "";
      
        // Convert decimal to binary by repeated division by 2
        while (decimal > 0) {
          let remainder = decimal % 2;
          binaryStringBuilder = remainder + binaryStringBuilder; // Insert the remainder at the beginning of the string
          decimal = Math.floor(decimal / 2);
        }
      
        return binaryStringBuilder;
      }

      function removeDot(binaryArray) {
        const binaryString = binaryArray.join(''); // Convert char array to string
        const dotIndex = binaryString.indexOf('.');
        if (dotIndex === -1) {
          // If dot is not found, return the original array
          return binaryArray;
        }
      
        // Remove the dot by shifting array values to the left
        for (let i = dotIndex; i < binaryArray.length - 1; i++) {
          binaryArray[i] = binaryArray[i + 1];
        }
      
        // Resize the array to remove the last element (which is now a duplicate of the one before the dot)
        binaryArray.pop();
      
        return binaryArray;
    }

    function Mantissa(binaryArray) {
        const firstOneIndex = findFirstOneIndex(binaryArray);
        if (firstOneIndex === -1) {
          // If '1' is not found, return an empty array
          return [];
        }
      
        // Create a new array to store the trimmed values
        const trimmedArray = binaryArray.slice(firstOneIndex + 1);
      
        // Remove the dot from the trimmed array
        const mantissaArray = removeDot(trimmedArray);
      
        return mantissaArray;
    }

    function denomalizedMantissa(inputArray, padding) {
        // Find the index of the dot in the input array
        let dotIndex = -1;
        for (let i = 0; i < inputArray.length; i++) {
            if (inputArray[i] === '.') {
                dotIndex = i;
                break;
            }
        }
    
        // Create a new array with the length of the input array minus the dot plus the padding
        let result = new Array(inputArray.length - 1 + padding);
    
        // Pad the most significant bit with zeros
        for (let i = 0; i < padding; i++) {
            result[i] = '0';
        }
    
        // Copy characters from the input array, excluding the dot
        let resultIndex = padding;
        for (let i = 0; i < inputArray.length; i++) {
            if (inputArray[i] !== '.') {
                result[resultIndex++] = inputArray[i];
            }
        }
    
        return result;
    }

    function padMantissa(mantissa) {
        if (mantissa.length >= 10) {
            // If the mantissa is already 10 or more digits, no padding is needed
            return mantissa;
        }
    
        // Create a new array to hold the padded mantissa
        let paddedMantissa = new Array(10);
    
        // Copy the original mantissa into the padded mantissa
        for (let i = 0; i < mantissa.length; i++) {
            paddedMantissa[i] = mantissa[i];
        }
    
        // Pad the remaining positions with '0'
        for (let i = mantissa.length; i < 10; i++) {
            paddedMantissa[i] = '0';
        }
    
        return paddedMantissa;
    }
    
    function combineAll(signBit, exponentRep, mantissaChar) {
        return signBit + exponentRep + mantissaChar.join('');
    }

    function binaryToBeDisplayed(signBit, exponentRep, mantissaChar) {
        return signBit + " " + exponentRep + " " + mantissaChar.join('');
    }

    function binaryToHexadecimal(finalInBinary) {
        // Convert the binary string to decimal integer
        let decimalValue = parseInt(finalInBinary, 2);
    
        // Convert decimal integer to hexadecimal string
        let hexadecimal = decimalValue.toString(16).toUpperCase();
    
        // Pad with zeros if necessary to ensure 4-digit hexadecimal representation
        while (hexadecimal.length < 4) {
            hexadecimal = "0" + hexadecimal;
        }
    
        return hexadecimal; // Convert to uppercase for consistency
    }

    function isValidBinary(binaryInput) {
      // Regular expression to match binary numbers with optional decimal point
      const binaryRegex = /^-?[01]+(\.[01]+)?$/;
  
      // Regular expression to match the square root of a negative integer in binary format
      const sqrtNegativeRegex = /^SQRT\(-\d+\)$/;
  
      // Regular expression to match "Nan", "NaN", or "nan" (case-insensitive)
      const nanRegex = /^(?:NaN|nan)$/i;
  
      // Regular expression to match logarithms of negative integers in the format "log(negative integer)"
      const logNegativeRegex = /^log\(-\d+\)$/;
  
      return binaryRegex.test(binaryInput) || sqrtNegativeRegex.test(binaryInput) || nanRegex.test(binaryInput) || logNegativeRegex.test(binaryInput);
  }

  function isItNaN(binaryInput) {

    // Regular expression to match the square root of a negative integer in binary format
    const sqrtNegativeRegex = /^SQRT\(-\d+\)$/;

    // Regular expression to match "Nan", "NaN", or "nan" (case-insensitive)
    const nanRegex = /^(?:NaN|nan)$/i;

    // Regular expression to match logarithms of negative integers in the format "log(negative integer)"
    const logNegativeRegex = /^log\(-\d+\)$/;

    return sqrtNegativeRegex.test(binaryInput) || nanRegex.test(binaryInput) || logNegativeRegex.test(binaryInput);
}

let signBit_txt;
let exponentRep_txt;
let mantissaChar_txt;
let binaryStringDisplayed_txt;
let hexadecimal_txt;
let specase_txt;


// Function to fetch input values and display them in the HTML document
function submitForm() {
    var binaryInput = document.getElementById("inputString").value;
    var exponentInput = document.getElementById("inputInteger").value;
    exponentInput = parseInt(exponentInput);

    if (!isValidBinary(binaryInput)) {
        alert("Invalid binary input. Please enter a valid binary number.");
        return;
    }
    let SpecialCaseNan = false;
    
    if (isItNaN(binaryInput)) {
      SpecialCaseNan = true;
    }

    let specase = "None";

    let binaryArray = new Array(binaryInput.length);
    for (let i = 0; i < binaryInput.length; i++) {
        binaryArray[i] = binaryInput.charAt(i);
      }
    
    let signBit = checkSign(binaryArray); 
    binaryArray = addDecimalIfNeeded(binaryArray);
    binaryArray = removeSign(binaryArray);
    binaryArray = removeLeadingZeros(binaryArray);
    let binaryString = binaryArray.join('');
    let dotIndex = binaryString.indexOf('.');

    let firstOne = findFirstOneIndex(binaryArray);
    let ePlus = 0;

    if (dotIndex !== 0 && dotIndex !== 1) { // There's a 1 before the decimal (and there's a dot)
        ePlus = exponentInput + (dotIndex - 1);
    } else if (dotIndex === 0 && firstOne !== -1) { // There's no 1 before the first 1
        ePlus = exponentInput + (-firstOne);
    } else if (dotIndex === -1) { // No decimal at all or dotIndex is 1
        ePlus = exponentInput;
    } else {
      ePlus = exponentInput;
    }

    let FinalExponent = 15;
    let denormalized = false;
    FinalExponent = FinalExponent + ePlus;
    let difference = 0;

    if (ePlus < -14) {
        difference = ePlus + 14;
        difference = Math.abs(difference);
        difference--; // account for the 1
        console.log(difference);
        FinalExponent = 0;
        denormalized = true;
        specase = "Denormalize";
    }
    
    if(firstOne == -1){
        FinalExponent = 0;
        specase = "Zero";
    }
    if(FinalExponent >= 31){ // infinity
        FinalExponent = 31;
        specase = "Infinity";
    }

    let exponentRep = decimalToBinary(FinalExponent);
    while (exponentRep.length < 5) {
        exponentRep = "0" + exponentRep;
    }

    if (FinalExponent === 31) { // When infinity, set mantissa to all 0
        for (let i = 0; i < binaryArray.length; i++) {
            binaryArray[i] = '0'; // Set each element of binaryArray to '0'
        }
        
    }


    let mantissaChar;
    if (denormalized === true) {
        mantissaChar = denomalizedMantissa(binaryArray, difference);
    } else {
        mantissaChar = Mantissa(binaryArray);
    }

    mantissaChar = padMantissa(mantissaChar);

    mantissaChar = mantissaChar.slice(0, 10);

    // Display the input values in the HTML document

    let finalInBinary = combineAll(signBit, exponentRep, mantissaChar);
    let binaryStringDisplayed = binaryToBeDisplayed(signBit, exponentRep, mantissaChar);
    let hexadecimal = binaryToHexadecimal(finalInBinary);
    
    if (SpecialCaseNan === true) {
      signBit = 0;
      exponentRep = "11111";
      mantissaChar = "1000000000";
      mantissaChar = mantissaChar.split('');
      binaryStringDisplayed = "0 11111 1000000000";
      hexadecimal = "7E00";
      specase = "NaN (Quiet NaN)";
    }

    signBit_txt = signBit;
    exponentRep_txt = exponentRep;
    mantissaChar_txt = mantissaChar.join('');
    binaryStringDisplayed_txt = binaryStringDisplayed;
    hexadecimal_txt = hexadecimal;
    specase_txt = specase;

    document.getElementById("outputSign").textContent = "Sign: " + signBit;
    document.getElementById("outputExponentRep").textContent = "ExponentRep: " + exponentRep;
    document.getElementById("outputMantissa").textContent = "Mantissa: " + mantissaChar.join('');
    document.getElementById("outputBinary").textContent = "Binary: " + binaryStringDisplayed;
    document.getElementById("outputHex").textContent = "Hex: " + hexadecimal;
    document.getElementById("outputSpeCase").textContent = "Special Case: " + specase;

    document.getElementById('createFileBtn').disabled = false;
}

// Define the saveAs function using FileSaver.js
function saveAs(blob, filename) {
  if (typeof navigator.msSaveBlob !== 'undefined') {
    // For IE and Edge browsers
    navigator.msSaveBlob(blob, filename);
  } else {
    // For other browsers
    var link = document.createElement('a');
    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      console.error('File saving is not supported by your browser.');
    }
  }
}

// Your existing CreateTextFile function
function CreateTextFile() {
  var blob = new Blob(["Sign Bit: " + signBit_txt + "\n" +
                        "Exponent Representation: " + exponentRep_txt + "\n" +
                        "Mantissa: " + mantissaChar_txt + "\n" +
                        "Binary: " + binaryStringDisplayed_txt + "\n" +
                        "Hexadecimal: " + hexadecimal_txt + "\n" +
                        "Special Case: " + specase_txt], {
     type: "text/plain;charset=utf-8",
  });
  saveAs(blob, "download.txt");
}


  
