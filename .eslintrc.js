module.exports = {
  root: true,
  extends: "@react-native",
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "react/react-in-jsx-scope": "off",
    quotes: ["double", {avoidEscape: true}],
    "arrow-parens": ["error", "always"],
  },
};
