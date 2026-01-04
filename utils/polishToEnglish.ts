export function polishToEnglish(sentence: string): string {
  if (!sentence) return "";
  
  const translationDict: { [key: string]: string } = {
    ą: "a",
    ć: "c",
    ę: "e",
    ł: "l",
    ń: "n",
    ś: "s",
    ó: "o",
    ż: "z",
    ź: "z",
    // Handle uppercase versions too
    Ą: "a",
    Ć: "c",
    Ę: "e",
    Ł: "l",
    Ń: "n",
    Ś: "s",
    Ó: "o",
    Ż: "z",
    Ź: "z",
  };

  // First, normalize the string and replace Polish characters
  let sanitized = sentence
    .replace(/[ąćęłńśóżźĄĆĘŁŃŚÓŻŹ]/g, (matched) => {
      return translationDict[matched] || matched.toLowerCase();
    })
    // Remove quotes and other special characters early
    .replace(/["'""'']/g, "")
    // Replace spaces with dashes
    .replace(/\s+/g, "-")
    // Remove any remaining non-word characters except dashes
    .replace(/[^\w-]/g, "")
    // Convert to lowercase
    .toLowerCase()
    // Replace multiple consecutive dashes with single dash
    .replace(/-+/g, "-")
    // Remove leading/trailing dashes
    .replace(/^-+|-+$/g, "");

  return sanitized;
}
