/* Vi starter med en tom JS fil. */

/* Her skal vi introdusere og vise enkelt hva som er mulig via dom manipulering.*/


/* I html har vi følgende:

        En p tag som heter output.
        
        En knapp som heter colorswapper.
        
        Et tekst input felt som heter text input.
        
        En annen knapp som heter textswapper.

    Ideen er å vise DOM manipulering ved å implementere følgende funksjoner:

        Knappen colorswapper skal kunne lage en tilfeldig farge, og sette output.style.color til denne tilfeldige fargen.

        Knappen textswapper skal kunne hente teksten i inputfeltet text input, og legge det inn som output.textContent.
*/


/* Vi starter med å hente inn en referanse til output, colorswapper, textswapper og textinput i toppen av js filen: */

const colorButton = document.getElementById("colorswapper");
const outputText = document.getElementById("output");
const textInput = document.getElementById("textinput");
const textSwapper = document.querySelector("#textswapper");

/* Her kan vi vise at querySelector lar oss hente basert på css tags, mens getElementBy funksjoenen bare tar inn navnet direkte */

