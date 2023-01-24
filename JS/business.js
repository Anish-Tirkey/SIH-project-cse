  // nav bar js start

  //on clicking of view more news the api call has to be made for the page 2 or more in case or more news
  let pageNo = 0;
  let topNewsTitleArray = [];

  let pageData = getUrl().articles;
  // loadPageData();
  console.log(pageData)

  function getUrl(pageNo = 1) {
    pageNo++;
    const http = new XMLHttpRequest();
    http.open('get', `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d3087ba8e8f74cdb8ddb6a51f78c5a27&page=${pageNo}`, null);
    http.responseText = 'json';
    http.send(null);
    return JSON.parse(http.response);
  }

  function loadPageData() {
    topNewsTitleArray = [];
    let x  = getUrl(2).articles;
    x.forEach((elem)=>{
      if(elem.title)
      topNewsTitleArray.push(elem.title);
    })
  }

  document.querySelector("#image").addEventListener("click", myFunction);
  let count = 0;
  
  function myFunction(event) {
    count++;
    event.preventDefault();
    let val = document.querySelector(".search_box").value;
    // document.querySelector('#searchBar').style.display="block"
    if (count % 2 == 1) {
      document.querySelector(".search_box").style.display = "block";
      console.log("hell");
    } else {
      document.querySelector(".search_box").style.display = "none";
      console.log("oooo");
    }
  }

  // nav bar js end

  // panel below nav bar
  let text = document.querySelector('#sliderText');
  let prevBtn = document.querySelector('.prev_carousel');
  let nextBtn = document.querySelector('.next_carousel');
  let textNum = 0;
  //let play=true;

  // replacing the text array with the original data getting from the api
  // let topNewsTitleArray =
  //   [
  //     'National Herald case: Rahul Gandhi makes late night visit to hospital ahead of ED questioning',
  //     'Jan Mohammad Lone, LeT terrorist involved in bank managers murder, killed in encounter in Shopian',
  //     'Home Ministry begins process of central government recruitment for 10 lakh vacancies',
  //     'Shraddha Kapoors brother Siddhanth Kapoor claims his friends gave him drinks laced with drugs'
  //   ];




  
  prevBtn.addEventListener('click', function () {
    if (textNum === 0) {
      textNum = topNewsTitleArray.length - 1;
    } else {
      textNum--;
    }
    text.innerText = topNewsTitleArray[textNum];
  });

  nextBtn.addEventListener('click', function () {
    if (textNum === topNewsTitleArray.length - 1) {
      textNum = 0;
    } else {
      textNum++;
    }
    text.innerText = topNewsTitleArray[textNum];
  });

  var playing = true;
  var pauseButton = document.querySelector('#toggleCarousel');
  //Auto slide code
  let i = 0;
  let myInterval;
  function topNewsTitleInterval() {
    myInterval = setInterval(animateText, 2000);
  }

  function animateText() {
    let text = document.querySelector('#sliderText');
    if (topNewsTitleArray.length - 1 == i) {
      i = 0;
    }
    text.innerText = topNewsTitleArray[i];
    text.removeAttribute('class');
    text.setAttribute('class', 'animate__animated animate__fadeInRight')
    i++;
  }
  topNewsTitleInterval();
  function pauseSlideshow() {
    btn = document.querySelector('#sBtn');
    btn.setAttribute('class', 'carousel-play');
    playing = false;
    clearInterval(myInterval);
  }
  function playSlideshow() {
    btn = document.querySelector('#sBtn');
    btn.setAttribute('class', 'carousel-pause');
    playing = true;
    topNewsTitleInterval();
  }
  pauseButton.addEventListener('click', function () {
    if (playing) { pauseSlideshow(); }
    else { playSlideshow(); }
  });
  // panel below nav bar end js

  // left side panel start
  window.onscroll = function () {
    scrolli();
  };

  // Get the sidepanel
  let sidepaneleffect = document.getElementById("leftSidePanel");

  // Get the offset position of the sidepanel
  let sticky = sidepaneleffect.offsetTop;

  // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function scrolli() {
    if (window.pageYOffset >= sticky) {
      sidepaneleffect.classList.add("sticky");
      document.getElementById("rightMainNews").style.marginLeft = "25%";
    } else {
      sidepaneleffect.classList.remove("sticky");
      document.getElementById("rightMainNews").style.marginLeft = "0%";
    }
  }

  function filterByID(item) {
    if (item.category == "business") {
      return true;
    } else {
      return false;
    }
  }

  let toparr = [];
  let bottarr = [];
  let totData = pageData.length;

  for (let i = 0; i < totData / 2; i++) {
    toparr.push(pageData[i]);
  }

  for (let j = totData / 2; j < totData; j++) {
    bottarr.push(pageData[j]);
  }

  toparr.forEach(function (elem) {
    let box = document.createElement("div");
    box.setAttribute("id", box);
    let Image = document.createElement("img");
    if (elem.urlToImage)
      Image.setAttribute("src", elem.urlToImage);
    box.append(Image);
    let desc = document.createElement("h3");
    desc.innerText = elem.title;
    box.append(desc);
    if(elem.urlToImage)
    document.querySelector("#top").append(box);
  });
  let slideimg = [];
  let slideimgdesc = [];
  bottarr.forEach(function (elem) {
    if(elem.urlToImage && elem.title)
    {
    slideimg.push(elem.urlToImage);
    slideimgdesc.push(elem.title);
    }

  });

 
  function slidingimage() {
    let i = 0;
    let j = 1;

    let slidingshow = document.getElementById("slidingshow");
    let indi1 = document.createElement("div");
    let indi2 = document.createElement("div");
    let image = document.createElement("img");
    let imagedesc = document.createElement("h6");
    let image2 = document.createElement("img");
    let image2desc = document.createElement("h6");
    setInterval(function () {
      if (slideimg.length == j) {
        i = 0;
        j = 1;
      }

      image.src = slideimg[i];
      indi1.append(image);
      imagedesc.innerText = slideimgdesc[i];
      indi1.append(imagedesc);

      image2.src = slideimg[j];
      indi2.append(image2);
      image2desc.innerText = slideimgdesc[j];
      indi2.append(image2desc);
      i++;
      j++;
      slidingshow.append(indi1, indi2);
    }, 2000);
  }
  slidingimage();

  // mainrightcontent js end here


  //Checked 
  // Side nav bar using for redirection to other pages.
  document.querySelector('#health').addEventListener('click', function () {
    window.location.href = 'health.html';
  })


  document.querySelector('#india').addEventListener('click', function () {
    window.location.href = 'india.html';
  })
  document.querySelector('#sport').addEventListener('click', function () {
    window.location.href = 'sports.html';
  })

  document.querySelector('#business').addEventListener('click', function () {
    window.location.href = 'business.html';
  })

  document.querySelector('#world').addEventListener('click', function () {
    window.location.href = 'world.html';
  })
