Задача 07.00:
Самостоятельно разберитесь в коде PartSeven, ReduxLoggerTable и reducer, actions.js

Задача 07.01:
Добавляйте случайные числа по кнопке "Random!".
Наблюдайте за происходящим в Redux DevTools, понажимайте на кноки Action, State, Diff в Redux DevTools.

Задача 07.02:
В компонент ReduxLoggerTable добавьте третий столбик.

Этот столбик должен содержать время (HH:MM:SS), в которое был задиспатчен экшен. Подсказка: для этого придется добавить нужный код в createNewLog() в action.js

Дату храните в виде timestamp, который можно получить так: (new Date).getTime() или Date.now()

А еще значение timestamp используйте в качестве key элемента <tr className={styles.row}>, который рисуется в map.
Чтоб предупреждение исчезло... Warning: Each child in a list should have a unique "key" prop.