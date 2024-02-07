import { customAlphabet } from "nanoid";
import { lowercase } from "nanoid-dictionary";

export function generateUniqueInvoiceID() {
  // Create a custom alphabet for the letters and digits
  const alphabetDigits = "0123456789";

  // Create nanoid generators with custom alphabets and lengths
  const generateLetters = customAlphabet(lowercase, 2);
  const generateDigits = customAlphabet(alphabetDigits, 4);

  const letters = generateLetters(); // Generate two random letters
  const digits = generateDigits(); // Generate four random digits
  return letters + digits; // Concatenate letters and digits
}
