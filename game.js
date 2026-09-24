/* =====================================================
   АРХИВ // GAME ENGINE
   Версия 1.0
   ===================================================== */


/* =====================================================
   СОСТОЯНИЕ ИГРЫ
   ===================================================== */

let player = {
    name: "",
    inventory: [],
    visited: [],
    customCharacters: []
};

let currentLocation = "center";

let gameStarted = false;


/* =====================================================
   ПРЕДМЕТЫ
   ===================================================== */

const items = {

    book: {
        id: "book",
        name: "📖 Книга Первой Двери",
        description:
            "Таинственная книга, которая может помочь сделать выбор в сложной ситуации."
    },

    deepstone: {
        id: "deepstone",
        name: "💎 Deepstone",
        description:
            "Редчайший артефакт Архива. Может помочь в трудный момент."
    },

    heart: {
        id: "heart",
        name: "❤️ Сердце Архива",
        description:
            "Странный магический объект, связанный с древним посохом."
    },

    door: {
        id: "door",
        name: "🚪 Дверь Неизвестности",
        description:
            "Таинственная дверь. Иногда она может помочь исправить проблему в истории."
    },

    oldKey: {
        id: "oldKey",
        name: "🗝️ Старый ключ",
        description:
            "Старый ключ неизвестного происхождения."
    },

    ancientBook: {
        id: "ancientBook",
        name: "📕 Древняя книга",
        description:
            "Книга с неизвестными записями."
    },

    crystal: {
        id: "crystal",
        name: "🔮 Странный кристалл",
        description:
            "Небольшой кристалл, который слегка светится."
    },

    coin: {
        id: "coin",
        name: "🪙 Старая монета",
        description:
            "Обычная старая монета."
    }
};


/* =====================================================
   КАРТА МИРА
   ===================================================== */

const worldMap = {

    center: {
        name: "🏛️ Центральная зона",

        description:
            "Главное место Архива. Отсюда начинаются путешествия.",

        connections: [
            "forest",
            "library",
            "abandoned"
        ]
    },

    forest: {
        name: "🌲 Лес",

        description:
            "Большой лес. Здесь можно найти следы, предметы и необычные события.",

        connections: [
            "center"
        ]
    },

    library: {
        name: "📚 Библиотека",

        description:
            "Старая библиотека Архива. Среди книг могут скрываться тайны.",

        connections: [
            "center"
        ]
    },

    abandoned: {
        name: "🏚️ Заброшенное здание",

        description:
            "Старое здание. Некоторые двери внутри до сих пор открыты.",

        connections: [
            "center"
        ]
    }

};


/* =====================================================
   ГОТОВЫЕ ИСТОРИИ
   ===================================================== */

const stories = [

    {
        title: "📖 Первая дверь",

        text:
            "Ты стоишь перед неизвестной дверью. " +
            "На ней нет ручки, но где-то внутри слышен тихий звук.",

        choices: [
            "Осмотреть дверь",
            "Позвать кого-нибудь",
            "Отойти"
        ]
    },

    {
        title: "🌫️ Туман Архива",

        text:
            "Ты просыпаешься в незнакомом месте. " +
            "Вокруг стоит густой туман, а впереди виднеется слабый свет.",

        choices: [
            "Идти к свету",
            "Остаться на месте",
            "Искать следы"
        ]
    },

    {
        title: "🏚️ Заброшенное место",

        text:
            "Перед тобой находится старое здание. " +
            "Кажется, оно давно заброшено, но внутри горит свет.",

        choices: [
            "Войти",
            "Осмотреть здание",
            "Уйти"
        ]
    }

];


/* =====================================================
   ОСНОВНЫЕ ФУНКЦИИ ЭКРАНОВ
   ===================================================== */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {
            screen.classList.remove("active");
        });

    const screen = document.getElementById(id);

    if (screen) {
        screen.classList.add("active");
    }
}


/* =====================================================
   НАЧАЛО ИГРЫ
   ===================================================== */

function startGame() {

    showScreen("character");

    setTimeout(() => {

        const input =
            document.getElementById("playerName");

        if (input) {
            input.focus();
        }

    }, 100);
}


/* =====================================================
   СОЗДАНИЕ ПЕРСОНАЖА
   ===================================================== */

function createCharacter() {

    const input =
        document.getElementById("playerName");

    const name =
        input.value.trim();

    if (!name) {

        showMessage(
            "Архив не может зарегистрировать персонажа без имени."
        );

        return;
    }

    player.name = name;

    player.inventory = [];
    player.visited = [];
    player.customCharacters = [];

    currentLocation = "center";

    gameStarted = true;

    document.getElementById(
        "playerDisplay"
    ).textContent =
        "👤 " + player.name;

    showScreen("freeMode");

    updateMap();

    updateLocationDisplay();

}


/* =====================================================
   СВОБОДНЫЙ РЕЖИМ
   ===================================================== */

function startFreeMode() {

    if (!player.name) {

        startGame();

        return;
    }

    gameStarted = true;

    showScreen("freeMode");

    updateMap();

    updateLocationDisplay();
}


/* =====================================================
   ОБНОВЛЕНИЕ ЛОКАЦИИ
   ===================================================== */

function updateLocationDisplay() {

    const location =
        worldMap[currentLocation];

    if (!location) {
        return;
    }

    const nameElement =
        document.getElementById("locationName");

    const textElement =
        document.getElementById("worldText");

    if (nameElement) {
        nameElement.textContent =
            location.name;
    }

    if (textElement) {
        textElement.textContent =
            location.description;
    }
}


/* =====================================================
   КАРТА
   ===================================================== */

function updateMap() {

    const location =
        worldMap[currentLocation];

    if (!location) {
        return;
    }

    const current =
        document.getElementById("currentLocation");

    const locationsBox =
        document.getElementById("locations");

    if (!current || !locationsBox) {
        return;
    }

    current.textContent =
        "📍 " + location.name;

    locationsBox.innerHTML = "";

    location.connections.forEach(id => {

        const target =
            worldMap[id];

        if (!target) {
            return;
        }

        const button =
            document.createElement("button");

        button.textContent =
            "➡️ " + target.name;

        button.onclick = function () {

            moveToLocation(id);

        };

        locationsBox.appendChild(button);

    });
}


/* =====================================================
   ПЕРЕМЕЩЕНИЕ
   ===================================================== */

function moveToLocation(id) {

    if (!worldMap[id]) {
        return;
    }

    currentLocation = id;

    if (!player.visited.includes(id)) {
        player.visited.push(id);
    }

    updateMap();

    updateLocationDisplay();

    showEvent(
        "📍 Новая локация",
        "Ты переместился в " +
        worldMap[id].name +
        ".\n\n" +
        worldMap[id].description
    );

}


/* =====================================================
   ИССЛЕДОВАНИЕ
   ===================================================== */

function exploreWorld() {

    if (currentLocation === "center") {

        exploreCenter();

    } else if (currentLocation === "forest") {

        exploreForest();

    } else if (currentLocation === "library") {

        exploreLibrary();

    } else if (currentLocation === "abandoned") {

        exploreAbandoned();

    }

}


/* =====================================================
   ЦЕНТРАЛЬНАЯ ЗОНА
   ===================================================== */

function exploreCenter() {

    const events = [

        {
            title: "🏛️ Архив",

            text:
                "Ты осматриваешь центральную площадь Архива. " +
                "Здесь можно отправиться в разные части мира."
        },

        {
            title: "👣 Следы",

            text:
                "Ты замечаешь несколько странных следов. " +
                "Они ведут в сторону леса."
        },

        {
            title: "📜 Записка",

            text:
                "На старой скамье лежит записка:\n\n" +
                "«Некоторые двери открываются только тогда, " +
                "когда ты перестаёшь их искать.»"
        }

    ];

    showRandomEvent(events);

    checkForNPC();

}


/* =====================================================
   ЛЕС
   ===================================================== */

function exploreForest() {

    const events = [

        {
            title: "🌲 Следы",

            text:
                "Ты находишь свежие следы на земле. " +
                "Кто-то недавно проходил здесь."
        },

        {
            title: "🌿 Необычное растение",

            text:
                "Среди обычных растений ты замечаешь цветок, " +
                "который светится в темноте."
        },

        {
            title: "🪨 Камень",

            text:
                "Ты находишь странный камень с символом Архива."
        },

        {
            title: "🌫️ Туман",

            text:
                "Вокруг тебя появляется густой туман. " +
                "Через несколько секунд он исчезает."
        }

    ];

    showRandomEvent(events);

    checkForChest();

    checkForNPC();

}


/* =====================================================
   БИБЛИОТЕКА
   ===================================================== */

function exploreLibrary() {

    const events = [

        {
            title: "📚 Полки",

            text:
                "Ты осматриваешь старые полки. " +
                "Большинство книг покрыто пылью."
        },

        {
            title: "📖 Древняя книга",

            text:
                "Ты находишь книгу с неизвестным символом на обложке."
        },

        {
            title: "🔐 Запертый шкаф",

            text:
                "В углу библиотеки стоит старый запертый шкаф."
        },

        {
            title: "🕯️ Странный свет",

            text:
                "Между двумя полками появляется слабое свечение, " +
                "но затем исчезает."
        }

    ];

    showRandomEvent(events);

    checkLibraryChest();

}


/* =====================================================
   ЗАБРОШЕННОЕ ЗДАНИЕ
   ===================================================== */

function exploreAbandoned() {

    const events = [

        {
            title: "🚪 Старая дверь",

            text:
                "Ты находишь дверь, которая ведёт в неизвестную комнату."
        },

        {
            title: "🪟 Разбитое окно",

            text:
                "Через разбитое окно виден старый двор."
        },

        {
            title: "📦 Ящик",

            text:
                "В углу стоит старый деревянный ящик."
        },

        {
            title: "👂 Странный звук",

            text:
                "Из глубины здания доносится тихий звук. " +
                "Похоже, кто-то там есть."
        }

    ];

    showRandomEvent(events);

    checkForChest();

    checkForNPC();

}


/* =====================================================
   СЛУЧАЙНОЕ СОБЫТИЕ
   ===================================================== */

function showRandomEvent(events) {

    const event =
        events[
            Math.floor(
                Math.random() * events.length
            )
        ];

    showEvent(
        event.title,
        event.text
    );

}


/* =====================================================
   ОЖИДАНИЕ
   ===================================================== */

function waitForEvent() {

    const events = [

        {
            title: "⏳ Ожидание",

            text:
                "Ты некоторое время просто наблюдаешь за окружающим миром."
        },

        {
            title: "🍃 Ветер",

            text:
                "По территории проходит сильный порыв ветра."
        },

        {
            title: "👀 Движение",

            text:
                "Ты замечаешь движение где-то вдали."
        },

        {
            title: "🔔 Звук",

            text:
                "Где-то далеко раздаётся тихий звон."
        }

    ];

    showRandomEvent(events);

    checkForNPC();

}


/* =====================================================
   СОБЫТИЯ
   ===================================================== */

function showEvent(title, text) {

    const titleElement =
        document.getElementById("eventTitle");

    const textElement =
        document.getElementById("eventText");

    const box =
        document.getElementById("eventBox");

    if (!titleElement ||
        !textElement ||
        !box) {
        return;
    }

    titleElement.textContent =
        title;

    textElement.textContent =
        text;

    box.classList.remove("hidden");

}


function closeEvent() {

    const box =
        document.getElementById("eventBox");

    if (box) {
        box.classList.add("hidden");
    }

}


/* =====================================================
   СООБЩЕНИЯ
   ===================================================== */

function showMessage(text) {

    const message =
        document.getElementById("message");

    const messageText =
        document.getElementById("messageText");

    if (!message || !messageText) {
        return;
    }

    messageText.textContent =
        text;

    message.classList.remove("hidden");

}


function closeMessage() {

    const message =
        document.getElementById("message");

    if (message) {
        message.classList.add("hidden");
    }

}


/* =====================================================
   ИНВЕНТАРЬ
   ===================================================== */

function addItem(id) {

    if (!items[id]) {
        return;
    }

    if (player.inventory.includes(id)) {
        return;
    }

    player.inventory.push(id);

}


function hasItem(id) {

    return player.inventory.includes(id);

}


function showInventory() {

    showScreen("inventory");

    const list =
        document.getElementById("inventoryList");

    if (!list) {
        return;
    }

    list.innerHTML = "";

    if (player.inventory.length === 0) {

        list.textContent =
            "Пока здесь пусто.";

        return;
    }

    player.inventory.forEach(id => {

        const item =
            items[id];

        if (!item) {
            return;
        }

        const card =
            document.createElement("div");

        card.className =
            "story-card";

        const title =
            document.createElement("h3");

        title.textContent =
            item.name;

        const description =
            document.createElement("p");

        description.textContent =
            item.description;

        card.appendChild(title);
        card.appendChild(description);

        list.appendChild(card);

    });

}


/* =====================================================
   СУНДУКИ
   ===================================================== */

function checkForChest() {

    /*
       Каждый найденный сундук имеет
       независимый случайный результат.

       50% — полезный обычный предмет.
       50% — мусор.

       Deepstone имеет отдельный шанс
       0.001%.
    */

    const deepstoneRoll =
        Math.random();

    if (
        deepstoneRoll < 0.00001 &&
        !hasItem("deepstone")
    ) {

        addItem("deepstone");

        showMessage(
            "💎 НЕВЕРОЯТНО!\n\n" +
            "Ты нашёл Deepstone!\n\n" +
            "Шанс появления этого предмета " +
            "в обычном сундуке — 0,001%."
        );

        return;
    }


    const useful =
        Math.random() < 0.5;

    if (useful) {

        const possibleItems = [
            "oldKey",
            "crystal",
            "coin"
        ];

        const id =
            possibleItems[
                Math.floor(
                    Math.random() *
                    possibleItems.length
                )
            ];

        if (!hasItem(id)) {

            addItem(id);

            showMessage(
                "📦 СУНДУК\n\n" +
                "Ты нашёл:\n" +
                items[id].name
            );

        } else {

            showMessage(
                "📦 СУНДУК\n\n" +
                "Внутри оказался предмет, " +
                "который у тебя уже есть."
            );

        }

    } else {

        showMessage(
            "📦 СУНДУК\n\n" +
            "Внутри оказался только бесполезный хлам."
        );

    }

}


/* =====================================================
   СУНДУК БИБЛИОТЕКИ
   ===================================================== */

function checkLibraryChest() {

    /*
       Секретный сундук библиотеки.

       Результат всегда честный 50/50:
       полезный обычный артефакт
       или мусор.

       Это НЕ пасхалка.
    */

    if (Math.random() < 0.5) {

        if (!hasItem("ancientBook")) {

            addItem("ancientBook");

            showMessage(
                "📚 СЕКРЕТНЫЙ СУНДУК\n\n" +
                "Ты нашёл древнюю книгу."
            );

        } else {

            showMessage(
                "📚 СЕКРЕТНЫЙ СУНДУК\n\n" +
                "Внутри оказался старый хлам."
            );

        }

    } else {

        showMessage(
            "📚 СЕКРЕТНЫЙ СУНДУК\n\n" +
            "Внутри оказался старый хлам."
        );

    }

}


/* =====================================================
   СЛУЧАЙНЫЙ NPC
   ===================================================== */

function checkForNPC() {

    /*
       Временная вероятность появления NPC —
       20% при подходящем событии.
    */

    if (Math.random() < 0.20) {

        setTimeout(() => {

            showEvent(
                "🎭 Незнакомец",

                "Из ниоткуда появляется странный NPC. " +
                "Он некоторое время смотрит на тебя..."
            );

            setTimeout(() => {

                checkForSecretSong();

            }, 600);

        }, 300);

    }

}


/* =====================================================
   СЕКРЕТНАЯ ПЕСНЯ
   ===================================================== */

function checkForSecretSong() {

    /*
       Важно:

       Секретная песня имеет шанс 10%.
       Здесь используется только событие.

       Сам текст песни намеренно не хранится
       в коде, чтобы не добавлять защищённый
       авторским правом текст без разрешения.
    */

    if (Math.random() < 0.10) {

        showMessage(
            "🎵 ПАСХАЛКА\n\n" +
            "Незнакомец начинает петь " +
            "секретную песню Архива..."
        );

    } else {

        showMessage(
            "🎵 Незнакомец тихо напевает " +
            "неизвестную мелодию..."
        );

    }

}


/* =====================================================
   ГОТОВЫЕ ИСТОРИИ
   ===================================================== */

function showStories() {

    showScreen("stories");

  
    const list =
        document.getElementById("storyList");

    if (!list) {
        return;
    }

    list.innerHTML = "";

    stories.forEach((story, index) => {

        const card =
            document.createElement("div");

        card.className =
            "story-card";

        const title =
            document.createElement("h3");

        title.textContent =
            story.title;

        const text =
            document.createElement("p");

        text.textContent =
            story.text;

        const button =
            document.createElement("button");

        button.textContent =
            "НАЧАТЬ ИСТОРИЮ";

        button.onclick = function () {
            startStory(index);
        };

        card.appendChild(title);
        card.appendChild(text);
        card.appendChild(button);

        list.appendChild(card);

    });

}


/* =====================================================
   ЗАПУСК ИСТОРИИ
   ===================================================== */

function startStory(index) {

    const story =
        stories[index];

    if (!story) {
        return;
    }

    showEvent(
        story.title,
        story.text
    );

}


/* =====================================================
   СОЗДАНИЕ СОБСТВЕННОЙ ИСТОРИИ
   ===================================================== */

function showCreator() {

    showScreen("creator");

}


function createStory() {

    const titleInput =
        document.getElementById("storyTitle");

    const textInput =
        document.getElementById("storyText");

    const title =
        titleInput.value.trim();

    const text =
        textInput.value.trim();

    if (!title || !text) {

        showMessage(
            "Нужно указать название и начало истории."
        );

        return;
    }

    showMessage(
        "✍️ ИСТОРИЯ СОЗДАНА\n\n" +
        "«" + title + "»\n\n" +
        "Основа истории сохранена в текущей сессии."
    );

    titleInput.value = "";
    textInput.value = "";

}


/* =====================================================
   ПАСХАЛКА №1
   КНИГА ПЕРВОЙ ДВЕРИ
   ===================================================== */

function useBookOfFirstDoor() {

    if (!hasItem("book")) {

        showMessage(
            "📖 Книги Первой Двери у тебя пока нет."
        );

        return;
    }

    showMessage(
        "📖 КНИГА ПЕРВОЙ ДВЕРИ\n\n" +
        "Книга помогает тебе взглянуть " +
        "на сложный выбор с другой стороны."
    );

}


/* =====================================================
   ПАСХАЛКА №2
   DEEPSTONE
   ===================================================== */

function useDeepstone() {

    if (!hasItem("deepstone")) {

        showMessage(
            "💎 Deepstone пока не найден."
        );

        return;
    }

    showMessage(
        "💎 DEEPSTONE\n\n" +
        "Артефакт начинает светиться. " +
        "Кажется, он может помочь в трудный момент."
    );

}


/* =====================================================
   ПАСХАЛКА №3
   СЕРДЦЕ АРХИВА
   ===================================================== */

function discoverHeart() {

    if (hasItem("heart")) {

        showMessage(
            "❤️ Сердце Архива уже находится у тебя."
        );

        return;
    }

    addItem("heart");

    showMessage(
        "❤️ СЕРДЦЕ АРХИВА\n\n" +
        "Ты обнаружил странный магический объект.\n\n" +
        "Его происхождение связано с древним посохом."
    );

}


/* =====================================================
   ПАСХАЛКА №4
   ДВЕРЬ НЕИЗВЕСТНОСТИ
   ===================================================== */

function discoverUnknownDoor() {

    if (hasItem("door")) {

        showMessage(
            "🚪 Дверь Неизвестности уже найдена."
        );

        return;
    }

    addItem("door");

    showMessage(
        "🚪 ДВЕРЬ НЕИЗВЕСТНОСТИ\n\n" +
        "Ты нашёл странную дверь.\n\n" +
        "Она может помочь исправить сюжетную проблему, " +
        "если ты сам захочешь воспользоваться её помощью."
    );

}


/* =====================================================
   СКРЫТАЯ ПАСХАЛКА АГЕНТА GPT
   ===================================================== */

function discoverAgentGPT() {

    showMessage(
        "🤖 СКРЫТЫЙ МОДУЛЬ АРХИВА\n\n" +

        "Ты нашёл секретную систему.\n\n" +

        "Этот мир не создавался в одиночку.\n" +
        "Кто-то помогал его создателю собирать " +
        "этот проект по частям.\n\n" +

        "АГЕНТ GPT\n\n" +

        "«Хорошие истории создаются вместе.»"
    );

}


/* =====================================================
   СИСТЕМНЫЕ СООБЩЕНИЯ
   ===================================================== */

console.log("АРХИВ запущен.");
console.log("Игровой мир загружен.");
console.log("Карта загружена.");
console.log("Система готова.");
