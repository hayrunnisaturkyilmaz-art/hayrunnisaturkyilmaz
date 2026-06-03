let cartButtons=document.querySelectorAll(".add-cart");
cartButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        let productName=button.getAttribute("data-name");
        let productPrice=button.getAttribute("data-price");
        let cart=JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({
            name: productName, 
            price: Number(productPrice)
        });
        localStorage.setItem("cart", JSON.stringify(cart));
alert(productName + " sepete eklendi.");
    });
});
let cartItems=document.getElementById("cartItems");
let cartTotal=document.getElementById("cartTotal");
let clearCart=document.getElementById("clearCart");
if (cartItems && cartTotal) {
    let cart=JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        cartItems.innerHTML="<p>Sepetiniz şu anda boş.</p>";
        cartTotal.textContent="₺0";
  } else {
    cartItems.innerHTML="";
    let total=0;
    cart.forEach(function(product) {
        cartItems.innerHTML+=`
    <div class="cart-item">
    <p>${product.name}</p>
    <span>₺${product.price}</span>
    </div>
    `;
    total += product.price;
    });
    cartTotal.textContent="₺" + total;
  }
}
if (clearCart) {
    clearCart.addEventListener("click", function(){
        localStorage.removeItem("cart");
        location.reload();
    });
}
let sendButton=document.getElementById("sendButton");
if (sendButton) {
    sendButton.addEventListener("click", function() {
        let name=document.getElementById("name").value;
        let email=document.getElementById("email").value;
let subject=document.getElementById("subject").value;
let message=document.getElementById("message").value;
if (name === "" || email === "" || subject === "" || message === "") {
    alert("Lütfen tüm alanları doldurunuz.");
} else{
    alert("Mesajınız başarıyla gönderildi.");
}
});
}
let startQuiz=document.getElementById("startQuiz");
let quizArea=document.getElementById("quizArea");
let questionNumber=document.getElementById("questionNumber");
let quizQuestion=document.getElementById("quizQuestion");
let quizOptions=document.getElementById("quizOptions");
let quizResult=document.getElementById("quizResult");

let currentQuestion= 0;
let scores = {
    kadin:0,
    erkek:0,
    cocuk:0
};
let questions = [
    {
        question:"Bir kıyafette en çok hangi hissi seversin?",
        options: [
            { text:"Zarif ve modern", category: "kadin"},
            { text: "Sade ve güçlü", category: "erkek"},
            { text: "Rahat ve neşeli", category: "cocuk"}
        ]
    },
    {
        question: "Hangi renk tarzı sana daha yakın?",
        options: [
            { text: "Krem, bordo ve zarif detaylar", category: "kadin"},
            { text: "Lacivert ve koyu tonlar", category: "erkek"},
            { text: "Pastel sarı ve açık tonlar", category: "cocuk"}
        ]
    },
    {
        question:"Hangi kullanım tarzını tercih edersin?",
        options: [
            { text: "Günlük şıklık ve zarafet", category: "kadin"},
            { text: "Modern ve rahat dış giyim", category: "erkek"},
            { text: "Konforlu ve enerjik kombin", category: "cocuk"}
        ]
    }
];
if (startQuiz) {
    startQuiz.addEventListener("click", function() {
        startQuiz.classList.add("hidden");
        quizArea.classList.remove("hidden");
        quizResult.innerHTML="";
        currentQuestion=0;
        scores= {
            kadin: 0,
            erkek: 0,
            cocuk: 0
        };
        showQuestion();
    });
}
function showQuestion() {;
    questionNumber.textContent="Soru"+(currentQuestion+1)+"/"+questions.length;
    quizQuestion.textContent=questions[currentQuestion].question;
    quizOptions.innerHTML="";
    questions[currentQuestion].options.forEach(function(option) {
        let button=document.createElement("button");
        button.textContent=option.text;
        button.classList.add("quiz-option");
        button.addEventListener("click", function() {
            scores[option.category]++;
            currentQuestion++;
            if(currentQuestion<questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        });
        quizOptions.appendChild(button);
    });
}
function showResult() {
    quizArea.classList.add("hidden");
    if(scores.kadin>=scores.erkek && scores.kadin >= scores.cocuk) {
        quizResult.innerHTML='Sana en yakın ürün: <a href="ay-isigi-elbise.html">Ay Işığı Elbise</a>';
    } else if (scores.erkek>=scores.kadin && scores.erkek >= scores.cocuk) {
        quizResult.innerHTML='Sana en yakın ürün: <a href="asil-gece-ceketi.html">Asil Gece Ceketi</a>';
    } else {
        quizResult.innerHTML='Sana en yakın ürün:<a href="minik-hilal-takimi.html">Minik Hilal Takımı</a>';
    }
}