const quotes = [
  {
    quote: "Work hard, have fun, make history.",
    author: "Jeff Bezos",
  },
  {
    quote: "It is fine to celebrate success but it is more important to heed the lessons of failure.",
    author: "Bill Gates",
  },
  {
    quote: "When something is important enough, you do it even if the odds are not in your favor.",
    author: "Elon Musk",
  },
  {
    quote: "Risk comes from not knowing what you are doing.",
    author: "Warren Buffett",
  },
  {
    quote: "When you innovate, you've got to be prepared for everyone telling you you're nuts.",
    author: "Larry Ellison",
  },
  {
    quote: "In the end, we are our choices. Build yourself a great story.",
    author: "Jeff Bezos",
  },
  {
    quote: "When you are eighty years old, and in a quiet moment of reflection narrating for only yourself the most personal version of your life story, the telling that will be most compact and meaningful will be the series of choices you have made.",
    author: "Jeff Bezos",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random()*quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;

