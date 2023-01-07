## Установка

После клонирования репы

скопировать файл .env.example в .env и вписать настройки(в частности имя базы данных, логин и пароль к ней)

php artisan migrate

php artisan key:generate

php artisan jwt:secret

composer install

npm install

## Запуск

npx mix

php artisan serve и перейти на урл который будет показан в консоли(обычно http://localhost:8000/)

## Использование

При переходе на урл по умолчанию будет показана форма входа. С нее можно перейти к регистрации нажав соотв-ю кнопку.
Со страницы регистрации аналогично можно перейти обратно на форму логина.
При успешной регистрации вы будете автоматически залогинены и направлены на страницу чата(отдельно логинится не нужно).

Со страницы чата можно перейти на редактирование своего профиля нажав соотв-ю ссылку справа вверху либо выйти(возврат
на страницу логина с деактивацией токена).

На странице редактирования профиля можно изменить свое отображаемое имя и аватар(картинка будет автоматически сжата 
при сохранении до 50х50 пикс)

В чате при двойном клике по юзеру в списке слева он будет подставлен в форму ввода сообщения как упоминаемый. При
наличии такого упоминания(его также можно написать вручную по маске @"имя_пользователя") текущее сообщение будет
у упоминаемого юзера выделено жирным шрифтом.
