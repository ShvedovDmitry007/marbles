'use strict';

(() => {
  // console.log(`Старт игры!`);

  // Количество шариков на старте игры
  const balls = {
    player: 5,
    bot: 5,
  };
  alert(`Старт игры!\nКоличество шариков\nИгрок: ${balls.player}\nБот: ${balls.bot}`);


  const getRandomIntInclusive = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  };

  const game = () => {
    // Загадываем число шариков:
    // Игрок
    const playerEntered = () => {
      const playerPrompt = +prompt(`Загадайте число от 1 до ${balls.player}`);
      if (playerPrompt === 0) {
        const endGame = confirm('Желаете закончить игру?');

        if (endGame === true) {
          alert('До встречи! :-)');
        } else {
          alert('Введите что-то...');
          return playerEntered();
        }
      } else if (isNaN(playerPrompt)) {
        alert('Вы ввели не число!');
        return playerEntered();
      } else if (parseFloat(playerPrompt) >= 1 &&
                parseFloat(playerPrompt) <= balls.player) {
        return playerPrompt;
      } else if (playerPrompt === null) {
        alert('Game Over!');
        return;
      } else {
        alert(`Число должно быть от 1 до ${balls.player}`);
        return playerEntered();
      }
    };
    const playerChoice = playerEntered();

    if (playerChoice === undefined) {
      alert('Игра закончена!');
      return;
    }

    // Бот
    const botChoice = getRandomIntInclusive(1, balls.bot);

    alert(`Игрок загадал ${playerChoice} шариков\nБот загадал ${botChoice} шариков`);

    // Проверяем, угадал ли бот
    const evenOrOdd = number => (number % 2 === 0 ? 'even' : 'odd');

    if (evenOrOdd(botChoice) === 'even' &&
        evenOrOdd(playerChoice) === 'even') {
      alert('Бот угадал чётное количество шариков!');
    } else if (evenOrOdd(botChoice) === 'odd' &&
              evenOrOdd(playerChoice) === 'odd') {
      alert('Бот угадал нечётное количество шариков!');
    } else {
      alert('Бот не угадал!');
    }

    // Считаем результат
    if (evenOrOdd(botChoice) === 'even' &&
        evenOrOdd(playerChoice) === 'even' ||
        evenOrOdd(botChoice) === 'odd' &&
        evenOrOdd(playerChoice) === 'odd') {
      alert('Бот выиграл раунд!');
      balls.bot += playerChoice;
      balls.player -= playerChoice;
    } else {
      alert('Игрок выиграл раунд!');
      balls.player += botChoice;
      balls.bot -= botChoice;
    }

    // Выводим информацию о количестве шариков
    alert(`У игрока ${balls.player} шариков\nУ бота ${balls.bot} шариков`);

    if (balls.player === 0 || balls.player < 0) {
      alert(`Игра закончена! Бот побеждает.`);
    } else if (balls.bot === 0 || balls.bot < 0) {
      alert(`Игра закончена! Игрок побеждает.`);
    } else {
      game();
    }
  };

  window.marbles = game;
})();
