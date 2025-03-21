const selectNone = document.getElementById("selectNone");
const wordShow = document.getElementById("wordshow");
const vocu = document.getElementById("vocu");
const nav = document.getElementById('nav')
const loaders = document.getElementById("loader");
const EmptyData = document.getElementById("dataNai");
const faq = document.getElementById('FAQ')
const logOut = document.getElementById('logOut')
const hero = document.getElementById('hero')

const loadVocuLevel = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => {
      showVocuLevel(data.data);

    });
};
const showVocuLevel = (vocabularies) => {
  const vocuLevel = document.getElementById("voculevel");

  for (const x of vocabularies) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `<button onclick="loader();setTimeout(() => loadWord(${x.level_no}),200)" 
      class="btn btn-lg text-sm font-semibold  btn border-1 rounded-[4px] 
      text-[#422AD5] hover:bg-[#422AD5] hover:text-white border-[#422AD5] bg-transparent">
      <i class="fa-solid fa-book-open"></i> Lesson-${x.level_no}
    </button>`;
    newDiv.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".btn").forEach(e => e.classList.remove("highlight"));
        btn.classList.add("highlight");
      });
    });
    
    vocuLevel.append(newDiv);
  }
};



const loader = () => {
  wordShow.classList.add("hidden");
  loaders.innerHTML = "";

  const loadDiv = document.createElement("div");
  loadDiv.innerHTML = `<div class="text-center flex justify-center items-center loading loading-dots loading-xl"></div>`;

  loaders.append(loadDiv);
};

const showWord = (data) => {
  EmptyData.innerHTML = ''
  selectNone.classList.add("hidden");

  if (data.length === 0) {
    loaders.innerHTML = ""

    const box = document.createElement("div");
    box.innerHTML = `<div class="text-center  mt-3 flex flex-col justify-center items-center rounded-2xl gap-3 p-8 bg-[#F8F8F8]">
              <img src="images/alert-error.png" alt="">
              <h1 class="font-[Hind_Siliguri] text-[#79716B] text-xs">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
              <h1 class="font-[Hind_Siliguri] text-[#292524] text-3xl">নেক্সট Lesson এ যান</h1>
            </div>`;
    EmptyData.appendChild(box)
  }

  else {
    loaders.innerHTML = "";
    wordShow.classList.remove("hidden");
    wordShow.innerHTML = "";
    selectNone.classList.add("hidden");
    for (let x of data) {
        const newBox = document.createElement("div");
        newBox.innerHTML = `<div class="w-[450px] bg-white p-16 h-[370px] rounded-lg flex flex-col justify-center items-center gap-3 ">
              <h1 class="text-[#000000] text-3xl font-bold text-center">${x.word}</h1>
              <h1 class="text-xl font-medium opacity-80 text-center">Meaning /Pronounciation</h1>
              <p class="text-3xl font-[Hind_Siliguri] text-center opacity-80">"${(x.meaning === null ? "অর্থ পাওয়া যায়নি" : `${x.meaning}`)}/${x.pronunciation}"</p>
              <div class="flex justify-between items-center gap-76 mt-16">
                <div><i  onclick="showWordDetails(${x.id}) ;my_modal_4.showModal()" class="fa-solid cursor-pointer fa-circle-info bg-[#1A91FF1A] p-2 rounded-lg text-xl"></i></div>
                <div><i class="fa-solid fa-volume-high bg-[#1A91FF1A] p-2 rounded-lg text-xl"></i></div>
              </div>
            </div>`;
        wordShow.append(newBox);
      
    }
  }
};
const loadWord = (level) => {

  fetch(`https://openapi.programming-hero.com/api/level/${level}`)
    .then((res) => res.json())
    .then((data) => {
      showWord(data.data);

    });
};

const wordDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then((res) => res.json())
    .then((data) => {
      showWordDetails(data.data)


    })
}

const showWordDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const modal = document.getElementById("my_modal_4");
      const word = document.getElementById("word");
      const meaning_content = document.getElementById("Meaning_content");
      const para = document.getElementById('para');
      const synonames = document.getElementById('synonames');

      word.innerHTML = `${data.data.word} (<i class="fa-solid fa-volume-high"></i> : ${data.data.pronunciation})`;

      meaning_content.innerText = `${data.data.meaning === null ? "অর্থ পাওয়া যায়নি" : `${data.data.meaning}`}`
      para.innerText = `${data.data.sentence}`
      const synoNames = `${data.data.synonyms}`
      const synoArray = synoNames.split(",");
      synonames.innerHTML = ""
      synoArray.map((x) => {
        const box = document.createElement('div');
        if (x.length === 0) {
          box.innerHTML = ` <button class="btn bg-[#EDF7FF]">পাওয়া যায়নি</button>`
        }
        else {
          box.innerHTML = ` <button class="btn bg-[#EDF7FF]">${x}</button>`
        }
        synonames.append(box)
      })








      modal.showModal();
    });
};

loadVocuLevel();

const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', () => {
  const nameInput = document.getElementById('nameInput').value;
  const passInput = document.getElementById('passInput').value;
  if (nameInput === "") {
    alert("Enter a Valid Name");
  }
  else {
    if (passInput === "") {
      alert("Enter Password First")
    }
    else {
      (passInput === "123456" ? showAll() : alert("Wrong password"))
    }

  }

});



const showAll = () => {
  alert("success ")
  nav.classList.remove('hidden');
  vocu.classList.remove('hidden');
  faq.classList.remove("hidden");
  hero.classList.add("hidden")
}

logOut.addEventListener('click', () => {
  hero.classList.remove("hidden")
  nav.classList.add('hidden');
  vocu.classList.add('hidden');
  faq.classList.add("hidden");
})



