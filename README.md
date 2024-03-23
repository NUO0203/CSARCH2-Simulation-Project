CSARCH2 S15 Simulation Project
Made by: Hans Coo, Gio Estrada, Naman Srivastava, Steven Yu


About this project:
This project is a Binary-16 Floating Point Converter which converts accepts either binary floating point numbers or decimal floating point numbers and converts them into IEEE-754/1985 Half Prescision Format. The input is the significand in a floating point number on the desired radix, and an exponent valuer in decimal; while the outputs are the sign, the mantissa, the exponent representation, the binary IEEE format (all of those mentioned are in binary) and its hexadecimal format, and the special case if special cases apply. This doesn't only support normal cases but special cases as well such as NaN, infinity, denormalized, and zero. This also prints the results of your latest result of the program. 

NOTE: For NaN special case, please put SQRT(X), log(X) or NaN on the input; where X is a negative number. 


About Binary-16 Format:
1 - Sign Bit
5 - Exponent Representation
10 - Mantissa Representation


How to Run the Program:

Method #1:
1. To run the program, run index.html in your chosen browser

Method #2 (Using VS Code):
1. Install "Live Server" extension on Extensions
2. Once complete, press "Go Live" button on the bottom right
3. Choose if you want your input to be in binary or decimal
    3a. If you want binary, press "binary_front.html"
    3b. If you want decimal, press "decimal_front.html"


Inside the Program (Once you are able to run the program):
1. Write your significand in the desired radix point (Place a "-" on the start if you want to input negative numbers)
2. Write the exponent in decimal format
3. Press "Submit" to process the results
4. Press "Create Text File" to print the results in a text file
