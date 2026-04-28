---
title: "Оновлюємо версію zsh у Ventura 13.2 на MacBook pro"
date: 2023-02-03
slug: "m1-ventura-zsh"
tags:
  - "macOS"
  - "zsh"
---

Днями я встановив чергове оновлення macOS Ventura – версію 13.2. І переді мною постало питання чи варто користуватись вбудованим шелом, чи варто його оновити?

Швидкий пошук мережею не дав відповіді, тож я вирішив порівняти версії.

```sh
zsh --version
```

**zsh 5.8.1 (×86_64-apple-darwin22.0)**&nbsp;— типова версія що постачається Apple.

Перевіряємо яка версія є в Homebrew

```sh
brew info zsh
```

![Azsh default version in Ventura 13.2](zsh-m1-ventura-13.2.png)
**zsh: stable 5.9 (bottled), HEAD**&nbsp;— версія, яку можна отримати через Homebrew.

З першого погляду, бачимо, що в Homebrew версія свіжіша. Однак в око впадає ось це&nbsp;— <kbd>×86_64</kbd>, що наводить на думку, що це версія під Intel, не для Apple Silicon. 😕

## Рішення&nbsp;— оновлюватись! {#the-decision-is-to-update}

```sh
brew install zsh
```

Перезапускаємо шел

```sh
source ~/.zshrc
```

та перевіряємо версію встановленого шела

```sh
zsh --version
```

![Azsh updated via brew](zsh-m1-brew.png)

Порівнюємо

> zsh 5.8.1 (***×86_64***-apple-darwin22.0) — Intel (Ventura 13.2)
> zsh 5.9 (***arm-***apple-darwin22.1.0) — Apple Silicon (Homebrew)

Оновлена версія zsh 5.9 є версією саме під Apple Silicon 🚀, дивно що версія macOS, створена для M1/M2 містить збірку під Intel.

Якщо у вас M1/M2 Apple Silicon — раджу вам встановити версію zsh зібрану саме під ваш процесор.
