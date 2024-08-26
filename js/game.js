'use strict';

(() => {
  // Количество шариков на старте игры
  const balls = {
    player: 5,
    bot: 5,
  };

  alert(`Старт игры!\nКоличество шариков\nИгрок: ${balls.player}\nБот: ${balls.bot}`);

  const game = () => {
    // Игрок загадывает число
    const playerEntered = () => {
      const playerPrompt = +prompt(`Загадайте число от 1 до ${balls.player}`);

      if (!Number.isInteger(playerPrompt)) {
        alert ('Введите целое число!');
        return playerEntered();
      }

      if (playerPrompt === 0) {
        const endGame = confirm('Хотите закончить игру?');

        if (endGame === true) {
          alert('До встречи! :-)');
          return;
        } else {
          alert('Попробуем заново. Введите число:');
          return playerEntered();
        }
      }

      if (isNaN(playerPrompt)) {
        alert('Вы ввели не число!');
        return playerEntered();
      }

      if (parseFloat(playerPrompt) >= 1 && parseFloat(playerPrompt) <= balls.player) {
        return playerPrompt;
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

    alert(`Вы загадали ${playerChoice} шариков`);

    // Бот угадывает, чётное или нечётное число ввел игрок
    const botChoice = Math.floor(Math.random() * 2) === 0 ? 'even' : 'odd';

    alert(`Бот считает что число ${botChoice === 'even' ? 'чётное' : 'нечётное'}`);

    // Проверяем, угадал ли бот
    if (playerChoice % 2 === 0 && botChoice === 'even' ||
        playerChoice % 2 !== 0 && botChoice === 'odd') {
      alert('Бот угадал!');
    } else {
      alert('Бот не угадал!');
    }

    // Считаем результат
    if (playerChoice % 2 === 0 && botChoice === 'even' ||
        playerChoice % 2 !== 0 && botChoice === 'odd') {
      alert('Бот выиграл раунд и забрал шарики себе.');
      balls.bot += playerChoice;
      balls.player -= playerChoice;
    } else {
      alert('Вы выигрываете раунд и забираете шарики себе.');
      balls.player += playerChoice;
      balls.bot -= playerChoice;
    }

    if (balls.player < 0) {
      balls.player = 0;
    } else if (balls.bot < 0) {
      balls.bot = 0;
    }

    // Выводим информацию о количестве шариков
    alert(`У Вас ${balls.player} шариков\nУ бота ${balls.bot} шариков`);

    if (balls.player <= 0) {
      alert(`У Вас закончились шарики. Бот побеждает!`);
    } else if (balls.bot <= 0) {
      alert(`У бота закончились шарики. Вы победили!`);
    } else {
      game();
    }
  };

  window.marbles = game;
})();
