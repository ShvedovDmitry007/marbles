'use strict';

(() => {
  console.log(`Старт игры!`);

  // Количество шариков на старте игры
  const balls = {
    player: 5,
    bot: 5,
  };
  console.log(`Количество шариков\nИгрок: ${balls.player}\nБот: ${balls.bot}`);


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

    // Бот
    const botChoice = getRandomIntInclusive(1, balls.bot);

    console.log(`Игрок загадал ${playerChoice} шариков`);
    console.log(`Бот загадал ${botChoice} шариков`);

    // Проверяем, угадал ли бот
    const evenOrOdd = number => (number % 2 === 0 ? 'even' : 'odd');

    if (evenOrOdd(botChoice) === 'even' &&
        evenOrOdd(playerChoice) === 'even') {
      console.log('Бот угадал чётное количество шариков!');
    } else if (evenOrOdd(botChoice) === 'odd' &&
              evenOrOdd(playerChoice) === 'odd') {
      console.log('Бот угадал нечётное количество шариков!');
    } else {
      console.log('Бот не угадал!');
    }

    // Считаем результат
    if (playerChoice === undefined) {
      alert('Игра закончена!');
      return;
    }

    if (evenOrOdd(botChoice) === 'even' &&
        evenOrOdd(playerChoice) === 'even' ||
        evenOrOdd(botChoice) === 'odd' &&
        evenOrOdd(playerChoice) === 'odd') {
      console.log('Бот выиграл раунд!');
      balls.bot += botChoice;
      balls.player -= botChoice;
    } else {
      console.log('Игрок выиграл раунд!');
      balls.player += botChoice;
      balls.bot -= botChoice;
    }

    // Выводим информацию о количестве шариков
    console.log(`У игрока ${balls.player} шариков`);
    console.log(`У бота ${balls.bot} шариков`);

    if (balls.player === 0 || balls.player < 0) {
      console.log(`Игра закончена! Бот побеждает.`);
    } else if (balls.bot === 0 || balls.bot < 0) {
      console.log(`Игра закончена! Игрок побеждает.`);
    } else {
      game();
    }
  };

  window.marbles = game;
})();
