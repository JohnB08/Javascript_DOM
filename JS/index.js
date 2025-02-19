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

const root = document.documentElement;
const bgColor = getComputedStyle(root).getPropertyValue("--bgColor");

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

    /* Her ser du et eksempel på rekursjon, dvs funksjonen kjører seg selv på nytt, hvis distansen er for liten.  */
    if (!calculateDistance(color, bgColor)) return randomColor();
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

/* Vi kan også bruke en click event på textswapper knappen, for å hente inn verdien (value) til 
textInput, og sette det lik outputText.textContent */

textSwapper.addEventListener("click", ()=>
{
    if (textInput.value === null || textInput.value === "") return;
    outputText.textContent = textInput.value;
})

/* Ops! vi bør kanskje passe på at textInput.value faktisk har en verdi, vi vil jo ikke at vi ender opp med en tom output text!

La oss endre på eventlisteneren over, og legge på en "guard clause" som passer på at hvis input er tom, så skjer ingenting.
vi "returnerer" ut av funksjonen vår tidlig, for å forsikre oss om at ingenting blir overskrevet hvis textinput er tom. 
*/


/* BONUS! */


/* Fikk et spørsmål fra en deltager:
        "Når vi genererer en random farge, kan vi forsikre oss om at fargen alltid er en god kontrast med bakgrunnsfargen vi har?" 
        
    La oss se om vi klarer å tenke ut en løsning for dette:
    
    Fargekontraster kan ekstremt enkelt forklares som følgende:

    Ta to fargeverdier du vil se kontrasten mellom:
    #88f57c
    #c930cd
    splitt opp fargene slik at du får ut red, green og blue verdiene for seg selv:
    {
        r: [88, c9],
        g: [f5, 30],
        b: [7c, cd]
    }
    
    for hver av fargene, ta absoluttverdien av ene minus den andre, og sum sammen resultatet:

    sum = Math.abs(88 - c9) + Math.abs(f5 - 30) + Math.abs(7c - cd)

    jo høyere summen din er, jo lengre er "avstanden" mellom fargene dine, jo høyere er kontrasten mellom de. 
    En tommelfingerregel er at "avstanden" bør være rundt midtpunktet av maksverdien for farger.
     Siden hver farge kan ha en maks verdi på 255, og ish midpunktet til hver farge er 128, kan vi si at minste "avstand" for god 
     kontrast er ca 384,
     vi kan runde dette ned for å gi oss litt mer å jobbe med ved å si en minste value på 350. 
     

     For å kunne jobbe med dette bør vi også hente inn en referanse til bakgrunnsfargen på siden.

     Vi har heldigvis laget den som en css variabel i style.css filen vår, og vi kan hente den fra root via en referanse til root dokumentet,
     så en referanse til stylesheeten til root dokumentet (se linje 31 og 32.)


    La oss så lag en ny funksjon, som tar inn to fargeverdier som css strenger
    eksempel på css streng: #88f57c
    og regner ut avstanden mellom de, og gir oss en true eller false om avstanden er god, la oss kalle den calculateDistance()
    Vi trenger også en hjelpefunksjon som kan ta en streng, og gjøre den om til et array med tre fargeverdier. la oss kalle den convertStringToColorArray()
*/

function convertStringToColorArray(str)
{
    if (str.length != 7) return; //her passer vi på at strengen som kommer inn skal ha lengden 7, (# så seks tall).
    let strNoHashtag = str.slice(1,6); //her passer vi på å fjerne # fra starten av strengen vår.
    let colorArr = []; //vi definerer så et tomt array som skal holde alle fargene vi henter ut fra strengen vår.
    for (let i = 0; i < strNoHashtag.length; i+=2) //her definerer vi en loop som skal loope gjennom teksten vår, legg merke til at vi hopper 2 om gangen for å hoppe fra en fargekode til neste. 
    {
        colorArr.push(Number.parseInt(strNoHashtag.slice(i, i+2), 16)); //her henter vi ut 2 karaterer fra strNoHashtag, og gjør de om til et tall, legg merke til at vi legger med tallet 16 til parseInt funksjonen for å fortelle at dette er et heksadesimalt tall. 
    }
    return colorArr; //vi returnerer så fargeverdiene.

}

function calculateDistance(col1, col2)
{
    let colArr1 = convertStringToColorArray(col1); //vi gjør første teksten om til et farge array.
    let colArr2 = convertStringToColorArray(col2); //Vi gjør andre stringen om til et farge array.
    console.log(colArr1);
    console.log(colArr2);
    let sum = 0;
    for(let i = 0; i<colArr1.length; i++)
    {
        sum += Math.abs(colArr1[i] - colArr2[i])//Her tar vi absoluttverdien av hvert element i hver av arrayene og summerer de sammen. 
    }
    console.log(sum);
    return sum > 350; //her returnerer vi true eller false basert på om summen er større enn 350. hvis den er større får vi true, hvis den er mindre får vi false. 
}

/* La oss teste vår calculate distance funksjon:*/
let randcol = randomColor();
console.log(randcol);
console.log(bgColor);
console.log(calculateDistance(bgColor, randcol)); 

/* Hvis den viser false mye, så kan man prøve å endre --bgColor i css filen, for den er en ganske vanskelig farge å finne kontraster til.
 hvis man gjør den lysere eller mørkere er det lettere å generere kontraster */

 /* Vi kan nå oppdatere vår randomColor funksjon, for å bare returere en random farge, hvis kontrasten mellom de er stor nok! */

 /* Vi kan oppnå dette via recursion, aka at funksjonen kjører seg selv på nytt, til den har oppnådd det den ønsker. 
    Se på linje 61 for et eksempel på dette via While.*/