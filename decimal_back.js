function checkSign(DecimalInput) {
    if (DecimalInput === 0) {
        // DecimalInput is either 0 or -0 in JavaScript
        // Check if it's negative zero (-0)
        if (1 / DecimalInput === -Infinity) {
            return 1; // Negative number (-0)
        } else {
            return 0; // Positive number (0)
        }
    } else if (DecimalInput > 0) {
        return 0; // Positive number
    } else {
        return 1; // Negative number
    }
}

function integerToBinary(integer) {
    return (integer >>> 0).toString(2); // Use unsigned right shift to convert to unsigned integer
}

function fractionalToBinary(fractional) {
    var binary = '';
    var precision = 20; // Number of decimal places to consider

    while (fractional > 0 && binary.length < precision) {
        fractional *= 2;
        binary += Math.floor(fractional);
        fractional -= Math.floor(fractional);
    }

    return binary;
}

function decimalToBinary(decimal) {
    // Separate the integer and fractional parts
    var integerPart = Math.floor(decimal);
    var fractionalPart = decimal - integerPart;

    // Convert the integer part to binary
    var integerBinary = integerToBinary(integerPart);

    // Convert the fractional part to binary
    var fractionalBinary = fractionalToBinary(fractionalPart);

    // Combine the integer and fractional binary representations
    return integerBinary + "." + fractionalBinary;
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

function removeLeadingZeroesBeforeOneOrDot(binaryArray) {
    let firstOneOrDotIndex = binaryArray.findIndex(element => element === '1' || element === '.');
    if (firstOneOrDotIndex === -1) {
        // '1' or '.' not found, no leading zeros to remove
        return binaryArray;
    }

    let firstNonZeroIndex = firstOneOrDotIndex;
    for (let i = firstOneOrDotIndex - 1; i >= 0; i--) {
        if (binaryArray[i] !== '0') {
            firstNonZeroIndex = i + 1;
            break;
        }
    }

    let resultArray = binaryArray.slice(firstNonZeroIndex, firstOneOrDotIndex);
    resultArray.push(...binaryArray.slice(firstOneOrDotIndex));

    return resultArray;
}

function submitForm() {
    var DecimalInput = document.getElementById("inputString").value;
    var exponentInput = document.getElementById("inputInteger").value;
    exponentInput = parseInt(exponentInput);
    DecimalInput = parseFloat(DecimalInput); // Corrected variable name

    let specase = "None";

    let signBit = checkSign(DecimalInput);
    DecimalInput = Math.abs(DecimalInput);

    var binaryArray = decimalToBinary(DecimalInput).split('');
    binaryArray = removeLeadingZeroesBeforeOneOrDot(binaryArray);

    let dotIndex = binaryArray.indexOf('.');

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
    exponentRep = exponentRep.replace(/\.$/, '');
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

    let finalInBinary = combineAll(signBit, exponentRep, mantissaChar);
    let binaryStringDisplayed = binaryToBeDisplayed(signBit, exponentRep, mantissaChar);
    let hexadecimal = binaryToHexadecimal(finalInBinary);
    

    document.getElementById("outputSign").textContent = "Sign: " + signBit;
    document.getElementById("outputExponentRep").textContent = "ExponentRep: " + exponentRep;
    document.getElementById("outputMantissa").textContent = "Mantissa: " + mantissaChar.join('');
    document.getElementById("outputBinary").textContent = "Binary: " + binaryStringDisplayed;
    document.getElementById("outputHex").textContent = "Hex: " + hexadecimal;
    document.getElementById("outputSpeCase").textContent = "Special Case: " + specase;

}