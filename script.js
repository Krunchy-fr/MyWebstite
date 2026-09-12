```javascript
// Simple page-load animation

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".hero");

    hero.style.opacity = "0";
    hero.style.transform = "translateY(20px)";

    setTimeout(() => {
        hero.style.transition = "1s ease";
        hero.style.opacity = "1";
        hero.style.transform = "translateY(0)";
    }, 200);

});
```
