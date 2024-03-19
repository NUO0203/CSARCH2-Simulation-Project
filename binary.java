import java.util.Arrays;
import java.util.Scanner;

public class binary {

    static int findFirstOneIndex(char[] binaryArray) {
        for (int i = 0; i < binaryArray.length; i++) {
            if (binaryArray[i] == '1') {
                return i;
            }
        }
        // If '1' is not found, return -1
        return -1;
    }

    // Function to find the index of the first occurrence of '1' or '.'
    static int findFirstOneOrDotIndex(char[] binaryArray) {
        for (int i = 0; i < binaryArray.length; i++) {
            if (binaryArray[i] == '1' || binaryArray[i] == '.') {
                return i;
            }
        }
        // If neither '1' nor '.' is found, return -1
        return -1;
    }

    static char[] removeLeadingZeros(char[] binaryArray) {
        int firstOneOrDotIndex = findFirstOneOrDotIndex(binaryArray);
        if (firstOneOrDotIndex == -1) {
            // If neither '1' nor '.' is found, return the original array
            return binaryArray;
        }

        char[] trimmedArray = new char[binaryArray.length - firstOneOrDotIndex];
        System.arraycopy(binaryArray, firstOneOrDotIndex, trimmedArray, 0, trimmedArray.length);
        return trimmedArray;
    }

    static char[] removeDot(char[] binaryArray) {
        String binaryString = new String(binaryArray);
        int dotIndex = binaryString.indexOf('.');
        //int dotIndex = findDotIndex(binaryArray);
        if (dotIndex == -1) {
            // If dot is not found, return the original array
            return binaryArray;
        }

        // Remove the dot by shifting array values to the left
        for (int i = dotIndex; i < binaryArray.length - 1; i++) {
            binaryArray[i] = binaryArray[i + 1];
        }

        // Resize the array to remove the last element (which is now a duplicate of the one before the dot)
        return Arrays.copyOf(binaryArray, binaryArray.length - 1);
    }

    // Function to return all values in the array after the first one but excluding the dot
    static char[] Mantissa(char[] binaryArray) {
        int firstOneIndex = findFirstOneIndex(binaryArray);
        if (firstOneIndex == -1) {
            // If '1' is not found, return an empty array
            return new char[0];
        }

        // Create a new array to store the trimmed values
        char[] trimmedArray = new char[binaryArray.length - firstOneIndex - 1];

        // Copy values after the first '1' into the trimmed array
        System.arraycopy(binaryArray, firstOneIndex + 1, trimmedArray, 0, trimmedArray.length);

        trimmedArray = removeDot(trimmedArray);

        return trimmedArray;
    }

    // Function to pad the mantissa with zeros until it reaches a length of 10
    static char[] padMantissa(char[] mantissa) {
        if (mantissa.length >= 10) {
            // If the mantissa is already 10 or more digits, no padding is needed
            return mantissa;
        }

        // Create a new array to hold the padded mantissa
        char[] paddedMantissa = new char[10];

        // Copy the original mantissa into the padded mantissa
        System.arraycopy(mantissa, 0, paddedMantissa, 0, mantissa.length);

        // Pad the remaining positions with '0'
        for (int i = mantissa.length; i < 10; i++) {
            paddedMantissa[i] = '0';
        }

        return paddedMantissa;
    }

    // Function to convert decimal to binary
    static String decimalToBinary(int decimal) {
        if (decimal == 0) {
            return "0"; // Special case: if decimal is 0, return "0"
        }

        StringBuilder binaryStringBuilder = new StringBuilder();

        // Convert decimal to binary by repeated division by 2
        while (decimal > 0) {
            int remainder = decimal % 2;
            binaryStringBuilder.insert(0, remainder); // Insert the remainder at the beginning of the string
            decimal /= 2;
        }

        return binaryStringBuilder.toString();
    }

    // Function to check if the first element of the binary array is '-'
    static int checkSign(char[] binaryArray) {
        if (binaryArray.length > 0 && binaryArray[0] == '-') {
            return 1; // If first element is '-', return 1
        } else {
            return 0; // Otherwise, return 0
        }
    }

    // Function to check the sign and remove '-' if present
    static char[] removeSign(char[] binaryArray) {
        if (binaryArray.length > 0 && binaryArray[0] == '-') {
            // Remove '-' sign by shifting array values to the left
            for (int i = 1; i < binaryArray.length; i++) {
                binaryArray[i - 1] = binaryArray[i];
            }

            // Resize the array to remove the last element
            return Arrays.copyOf(binaryArray, binaryArray.length - 1);
        } else {
            // If no '-' sign is present, return the original array
            return binaryArray;
        }
    }

    // Function to combine sign bit, exponent representation, and mantissa into a single char array
    static char[] combineAll(int signBit, String exponentRep, String mantissa) {
        // Convert sign bit, exponent representation, and mantissa to char arrays
        char[] signBitArray = Integer.toString(signBit).toCharArray();
        char[] exponentRepArray = exponentRep.toCharArray();
        char[] mantissaArray = mantissa.toCharArray();

        // Calculate the total length of the combined char array
        int totalLength = signBitArray.length + exponentRepArray.length + mantissaArray.length;

        // Create the combined char array
        char[] combinedArray = new char[totalLength];

        // Copy each char array into the combined array
        System.arraycopy(signBitArray, 0, combinedArray, 0, signBitArray.length);
        System.arraycopy(exponentRepArray, 0, combinedArray, signBitArray.length, exponentRepArray.length);
        System.arraycopy(mantissaArray, 0, combinedArray, signBitArray.length + exponentRepArray.length, mantissaArray.length);

        return combinedArray;
    }

    // Function to convert binary to hexadecimal
    static String binaryToHexadecimal(char[] binaryInput) {
        // Convert the binary input to a string
        String binaryString = new String(binaryInput);

        // Convert binary string to decimal integer
        int decimalValue = Integer.parseInt(binaryString, 2);

        // Convert decimal integer to hexadecimal string
        String hexadecimal = Integer.toHexString(decimalValue).toUpperCase();

        // Pad with zeros if necessary
        while (hexadecimal.length() < 4) {
            hexadecimal = hexadecimal + "0" ;
        }

        return hexadecimal; // Convert to uppercase for consistency
    }


    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt the user to enter binary input
        System.out.print("Enter binary input: ");
        String binaryInput = scanner.nextLine();

        // Prompt the user to enter exponent
        System.out.print("Enter binary exponent: ");
        int exponentInput = scanner.nextInt();

        // Create an array to store each character of the binary input
        char[] binaryArray = new char[binaryInput.length()];

        // Store each character of the binary input in the array
        for (int i = 0; i < binaryInput.length(); i++) {
            binaryArray[i] = binaryInput.charAt(i);
        }

        int signBit = checkSign(binaryArray); 

        binaryArray = removeSign(binaryArray); 
        binaryArray = removeLeadingZeros(binaryArray); 
        String binaryString = new String(binaryArray);
        int dotIndex = binaryString.indexOf('.');
        int firstOne = findFirstOneIndex(binaryArray);
        int ePlus = -1;

        if(dotIndex!=0 && dotIndex !=1){ //there's a 1 before the decimal (but there's a dot)
            ePlus = exponentInput + dotIndex-1;

        
        } else if (dotIndex == 0 && dotIndex !=1){ //there's no 1 before the first 1
            ePlus = exponentInput + -firstOne;

        
        } else if (dotIndex == -1){ //no decimal at all
            ePlus = exponentInput + 0;

        }

        int FinalExponent = 15;
        boolean denormalized = false;
        FinalExponent = FinalExponent + ePlus;
        

        if(firstOne == -1){
            FinalExponent = 0;
        }
        if(FinalExponent >= 31){ // infinity
            FinalExponent = 31;
        }
        
        String exponentRep = decimalToBinary(FinalExponent);

        if(FinalExponent == 31){ //when infinity set mantissa to all 0
            for(int i=0; i<binaryArray.length; i++){
                binaryArray[i] = 0;
            }
        }

        char[] mantissaChar = Mantissa(binaryArray);
        if(denormalized == true){
            
        }

        mantissaChar = padMantissa(mantissaChar);
        String mantissa = new String(mantissaChar);
        char[] finalInBinaryTemp = combineAll(signBit, exponentRep, mantissa);
        String finalInBinary = new String(finalInBinaryTemp);
        String finalInHex = binaryToHexadecimal(finalInBinaryTemp);
        
        System.out.println("Sign Bit: " + signBit);
        System.out.println("Exponent Representation: " + exponentRep);
        System.out.println("Mantissa: " + mantissa);
        //System.out.println("Binary: " + finalInBinary);
        System.out.println("Hex: " + finalInHex);
        
    }


}