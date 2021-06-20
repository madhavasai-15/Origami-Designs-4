// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyApBCbj-o2uxCdZj6DdYs-kdGJEnJdCx-U",
    authDomain: "origami-designs-4.firebaseapp.com",
    projectId: "origami-designs-4",
    storageBucket: "origami-designs-4.appspot.com",
    messagingSenderId: "154423484760",
    appId: "1:154423484760:web:04f497576118d0ab67052d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var tutorialsCount;
firebase.database().ref('tutorialsCount').on('value', (data) => {
    tutorialsCount = parseInt(data.val())
});

var once = false;
var count = 0;
var tutorials = document.getElementById('tutorials');
var loading = document.createElement('h1');
loading.innerHTML = 'Loading..';
loading.style.position = 'absolute';
loading.style.left = '46.5%';
tutorials.appendChild(loading)

setInterval(async function () {
    if (!once) {
        if (tutorialsCount) {
            if (count < tutorialsCount) {
                firebase.database().ref('tutorialsNames/names/' + count).on('value', (name) => {
                    firebase.database().ref('tutorialsUrl/' + name.val() + '/url').on("value", (url) => {
                        if (url.val()) {
                            if (name.val()) {
                                var card = document.createElement('div');
                                card.className = 'card';
                                var achor = document.createElement('a');
                                achor.href = `Step-by-Step/${name.val()}.html`
                                var image = document.createElement('img');
                                image.id = 'preview';
                                image.src = url.val();
                                achor.appendChild(image);
                                var title = document.createElement('h2');
                                title.id = 'title';
                                title.innerHTML = name.val();
                                card.appendChild(achor);
                                card.appendChild(title);
                                tutorials.appendChild(card);
                                count++;
                            }
                        }
                    });
                });
            } else {
                loading.style.display = 'none';
            }
        }
    }
}, 1000);

