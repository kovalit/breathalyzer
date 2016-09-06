<h2>Breathalyzer</h2>

<p>Проверка орфографии и нахождение минимального количества перестановок в словах с ошибкой</p>

<b>Описание методов увеличения производительности.</b>
<ol>
<li>Быстродействие оперативной памяти значительно превышает быстродействие файловой системы или СУБД. Поэтому первый шаг – 
загрузка словаря в оперативную память.</li>
<li>Второй шаг – индексирование на основе теории баз данных.  Необходимо для ускорения поиска. Индексом в предложенной
реализации является длина слова. На каждой итерации выполнять поиск по всему словарю не нужно.  Достаточно пройтись по 
ограниченной группе слов с определенной длиной.</li>
<li>Вероятность нахождения минимального расстояния убывает со смещением от исходной длины слова. Поэтому итерации будут начинаться с 
поиска слов с такой же длиной, как у целевого, затем равномерно перемешаемся в оба направления от центра. Т. е. по принципу пирамиды.</li>  
<li>Предполагаю, что поиск слов, длина которых в 2 раза превышает длину исходного, не имеет смысла. Так как даже при полном расхождении 
в буквах минимальное расстояние будет найдено, до двукратного превышения длины.</li>
<li>Если смещение от длины исходного слова равно расстоянию Левенштейна – то это минимальная  длина. Переход на следующие итерации 
не имеет смысла.</li>
<li>Что бы избежать повторного расчета минимальной длины, реализовано кеширование. Перед расчетом производится проверка слова 
в кеше (отдельном массиве).</li>
<li>Смена регистра букв – емкая операция. Поэтому ее выполняем на строке во входном файле, а не у словаря.</li>
<li>Использование более быстрых языковых конструкций. Например: расчет длины массива до цикла, а не на каждой его итерации и др.
В целом, использование объектно-ориентированного подхода снижает производительность, но улучшает поддержку и читаемость кода. 
Поэтому важен баланс между производительностью и поддержкой.</li>
</ol>
