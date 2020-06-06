part-02

Задача 02.00: Переделать в редьюсере if-ы на одни switch.

Задача 02.01:
Требуется добавить input, через который можно будет изменять значения max_number.
Сейчас max_number статичный и при клике всегда равен 13.

```
<div className="PartTwo">

    <b>State:</b>
    <pre>{debugg_state}</pre>

    <input placeholder="Max random number" ... /> {/** Для задачи 02.01 поле добавить тут */}

    <button onClick={this.generateRandom}>GENERATE RANDOM</button>
    <button onClick={this.addCount}>ADD COUNT</button>
</div>
```
Задача 02.02:
Сделайте так, чтобы при вводе в поле (из 02.01) значение сохранялось в State в свойство max_number

const initState = {
  max_number: 13,
  random: 42,
  count: 0
};

И переделайте обработку GENERATE_RANDOM в редьюсере так,
чтобы он брал значение max_number не из объекта action, а из State нового свойства max_number