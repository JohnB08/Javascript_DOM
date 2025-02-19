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

const colorSwapper = document.getElementById("colorswapper");
const outputText = document.getElementById("output");
const textInput = document.getElementById("textinput");
const textSwapper = document.querySelector("#textswapper");

/* Her kan vi vise at querySelector lar oss hente basert på css tags, mens getElementBy funksjoenen bare tar inn navnet direkte */

/* Vi må så lage en funksjon som skal kunne gjøre følgende:
    Generer en random gyldig farge.
*/

/* Når vi skriver inn farger i css:
    #574e49
    skriver vi inn noe som heter et hexadesimalt tall, men hver del av tallet representerer sin egen farge (rgb).
    
    tallet 57 representerer fargen rød, og er en hexadesimalverdi som oversatt til "vanlige tall" vil ligge en plass mellom 0-255
    det samme gjelder 4e, som representerer hvor sterk fargen grønn skal være i fargemixen,
    og tallet 49 gjør det samme for fargen blå. 
    Tallet kan også representeres via rgb verdier, som i css blir skrevet som:
    rgb(87, 78, 73) hvor 57 i hexadesimal er lik tallet 87 i vårt vanlige titallsystem, 78 er tallet 4e og 73 er tallet 49.

    Vi har flere måter på å generere et tilfeldig tall på selv, men det letteste er nok å generere et tall basert på maxverdien
    av en gyldig farge:
    FFFFFF

    La oss se på en måte å gjøre dette på, via Math.Random()
*/

function randomColor()
{

    let color = "#" + Math.trunc((Math.random() * 0xffffff)).toString(16).padStart(6,"0");

    /* La oss gå gjennom denne funksjonen del for del:
    
        "#" + : Vi starter med dette, siden alle fargekodene i css starter med en # for å markere at dette er en hexadesimal verdi. vår fargekode må gjøre det samme.
        Math.trunc() passer på at vi ikke får noen desimalverdier ut av den random tallgeneratoren vår.
        (Math.random() * 0xffffff) Her lager vi et random tall mellom 0 og maks verdien til en fargekode i css.
        .toString(16) her gjør vi tallet vårt om til tekst. vi gir funksjonen tallet 16 for å fortelle at tallet som skal gjøres om til tekst er et heksadesimalt tall.
        .padStart(6, "0") sier at hvis lengden på teksten generert er mindre enn 6, legg til 0 i starten til lengden blir 6.
        da sitter vi igjen med en random gyldig cssfarge.    
    */
    return color;
}

/* La oss teste randomcolor funksjonen vår, ved å console.log den ut. */

console.log(randomColor());

/* Vi har nå en fungerende farge. Vi kan nå lage en EventListener på colorswapper for å sette color til output lik denne random color metoden vår.  */

colorSwapper.addEventListener("click", ()=>{
    outputText.style.color = randomColor();
})

/* Hva skjer her?
    
        Vi sier til js, at den skal lytte etter et event som skjer på colorSwapper,
        spesifikt skal det lytte på et "click" event.
        Når det eventet skjer, skal den kjøre følgende funksjon:
            outputText.Style.color = randomColor();
*/