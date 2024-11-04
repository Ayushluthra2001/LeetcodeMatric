document.addEventListener("DOMContentLoaded",function(){
    const searchButtom = document.getElementById("search-button");
    const userName = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const mediumProgress = document.querySelector(".medium-progress");
    const hardProgress = document.querySelector(".hard-progress");
    const easyProgress = document.querySelector(".easy-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

    // validate true or false based on regex
    function validateUserName(username){
        if(username.trim() ===""){
            alert("Username Should not be Empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const ismatch = regex.test(username);
        if(!ismatch){
            alert("Invalid UserName");
        }
        return ismatch;
    }



    // fetching user data with the help of 

    async function fetchuserDetails(username){

        // this url is giving user leetcode stats 
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`
        try{
            searchButtom.textContent = "Searching...";
            searchButtom.disabled=true;
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch the user details");

            }
            const parsedata = await response.json();
            console.log("Logging data" , parsedata);
            displayUserData(parsedata);
        }catch(error){


            statsContainer.innerHTML= `<p>No Data Found</p>`;
        }finally{
            searchButtom.textContent="Search";
            searchButtom.disabled= false;
        }
    }


    function updateProgress(solved , total , label , circle){
        const progressdegree = (solved / total)*100;
        circle.style.setProperty("--progress-degree" , `${progressdegree}%`);
        label.textContent=`${solved} /${total}`;
    }


    function displayUserData(parsedata){
        const totalsolvedQuestion = parsedata.totalQuestions;
         const totaleasyQuestion = parsedata.easySolved;
         const totalmediumQuestion = parsedata.mediumSolved;
         const totalhardQuestion = parsedata.hardSolved;

        //  const totalQuestion  = parsedata.totalQuestion;
         const easy = parsedata.totalEasy;
         const medium = parsedata.totalMedium;
         const hard = parsedata.totalHard;
         //console.log(totalHardQuestion);
       updateProgress(totaleasyQuestion, easy , easyLabel , easyProgress);
       updateProgress(totalmediumQuestion, medium , mediumLabel , mediumProgress);
       updateProgress(totalhardQuestion, hard , hardLabel , hardProgress);
    }


    searchButtom.addEventListener("click",function(){
        const username = userName.value;
        // console.log(username);
        console.log("Loggin UserName:" , username);
        
        if(validateUserName(username)){
            fetchuserDetails(username);
        }

    })


})