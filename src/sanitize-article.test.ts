import test from "ava";
import { sanitizeArticle } from "./sanitize-article";

test("remove ---line", (t) => {
  t.is(sanitizeArticle("ceva text \nCiteste si", "ro"), "ceva text");
  t.is(sanitizeArticle("ceva text \nCitește și despre...", "ro"), "ceva text");
});

test("remove multi ---line", (t) => {
  t.is(
    sanitizeArticle(
      "ceva text \nCiteste si ceva \n Alt text\nCiteste si...",
      "ro"
    ),
    "ceva text\nAlt text"
  );
});

test("remove ---end", (t) => {
  t.is(
    sanitizeArticle("ceva text \nCiteste mai departe...", "ro"),
    "ceva text"
  );
});

test("remove ---end & --line", (t) => {
  t.is(
    sanitizeArticle(
      "ceva text \nCiteste si ceva \n Alt text\nCiteste si... \nCiteste mai departe",
      "ro"
    ),
    "ceva text\nAlt text"
  );
});

test("remove Articolul ... apare...", (t) => {
  t.is(
    sanitizeArticle(
      `Trapperul Gheboasă a fost amendat după ce jandarmii din Cluj-Napoca s-au autosesizat cu privire la versurile pe care acesta le-a cântat pe scena de la Untold.

Articolul Trapperul Gheboasă, amendat după prestația de la Untold apare prima dată în Romania TV.`,
      "ro"
    ),
    "Trapperul Gheboasă a fost amendat după ce jandarmii din Cluj-Napoca s-au autosesizat cu privire la versurile pe care acesta le-a cântat pe scena de la Untold."
  );
});

test("remove (", (t) => {
  t.is(
    sanitizeArticle(
      `Text
(Citeste si: Text)`,
      "hu"
    ),
    "Text"
  );
});
