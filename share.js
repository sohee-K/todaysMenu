function shareSNS(sns) {
    const urlPage = "https://sohee-K.github.io/todaysmenu";
    const text = "오늘의 운세와 간단한 심리테스트로 오늘의 메뉴 추천받기";
    let url;

    switch (sns) {
        case "facebook" :
            url = "http://www.facebook.com/sharer/sharer.php?u=" + urlPage;
            break;
        case "twitter" :
            url = "http://twitter.com/intent/tweet?text=" + text + "&url=" + urlPage;
            break;
    }
    window.open(url);
}
