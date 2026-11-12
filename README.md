# Ennegram

Siyah-yeşil tasarımlı, ücretsiz ve yalnız tarayıcıda çalışan Enneagram öz değerlendirmesi.

**Canlı adres:** https://ennegram-f25z.vercel.app/

## Kullanım

Hesap, isim, e-posta, API anahtarı veya ücretli servis gerekmez. 74 kısa ifadenin ardından yanıtlarına göre seçilen karşılaştırmalar ve üç portrelik son bir seçim sunulur. Yanıtlar ve ilerleme yalnız bu tarayıcının `localStorage` alanında saklanır. Ara verip devam edebilir, önceki yanıtları değiştirebilir, sonuçları JSON olarak indirebilir veya yazdır/PDF işlevini kullanabilirsin.

Eski sürümdeki otomatik Google Sheets gönderimi kaldırıldı. Sunucuya sonuç veya yanıt gönderilmez. Ortak cihazlarda sonuç ekranındaki silme seçeneğiyle yerel kayıt temizlenebilir. Barındırma sağlayıcısının standart sayfa erişim kayıtları bundan ayrıdır.

## Basit mimari

- `index.html`: erişilebilir sayfa iskeleti ve giriş içeriği.
- `assets/app.js`, `assets/style.css`: dinamik arayüz, SVG diyagramları ve mobil görünüm.
- `assets/state.js`: test akışı, uyarlanabilir karşılaştırmalar, geri dönüş ve kayıt doğrulaması.
- `assets/score.js`: bağımsız, saf hesaplama fonksiyonları.
- `assets/items.js`, `assets/pairs.js`, `assets/content.js`: soru bankası ve tip açıklamaları.
- `scripts/build.mjs`: yalnız yayın dosyalarını `dist/` içine kopyalar.

Arif Demir'in mevcut Enneagram çalışmasındaki soru bankası ve puanlama mantığı, web sitesi entegrasyonları taşınmadan bağımsız JavaScript modüllerine aktarıldı. React, Next.js, veritabanı, sunucu fonksiyonu ve çalışma zamanı bağımlılığı yoktur.

## Yerelde çalıştır

Node.js 22 veya üstü yeterlidir; `npm install` gerekmez.

```sh
npm run dev
# http://127.0.0.1:4173
npm test
npm run build
```

## Puanlama ve sınırlar

1. Her tip için sekiz ifade, altı dereceli yanıt ölçeği ve ters kodlanan maddeler kullanılır. İki ek ifade, aşırı idealize yanıt eğilimini değerlendirmek içindir.
2. Her tipin kendi ifade ortalaması hesaplanır. Kişinin bütün ifadelere katılma eğilimini azaltmak için kişi içinde merkezlenir.
3. Yakın çıkan adaylar, dengeli ikili karşılaştırmalar ve etiketsiz portre seçimiyle birlikte değerlendirilir. Kanatlar yalnız ana tipin iki komşusundan seçilir.
4. Yanıt hızı, tek seçenek kullanımı ve iki yarı arasındaki tutarlılık yorumun temkinli sunulmasına yardımcı olur.

**Bu deneysel araç psikometrik olarak doğrulanmış bir ölçek veya klinik değerlendirme değildir.** Benzetim sonuçları gerçek kişiler üzerinde doğrulama yerine geçmez. İç hesaplamadaki softmax ağırlıkları doğrulanmış kişilik olasılıkları değildir; arayüz bunları bilimsel güven yüzdesi olarak göstermez. Her tipin ifade uyumu ayrı değerlendirilir ve yüzdelerin toplamı 100 olmak zorunda değildir. Kanat, merkez ve gelişim/stres bağlantıları model içi yorumlayıcı kavramlardır.

Modeli tanımak için: [Enneagram Institute — Sistem nasıl çalışır?](https://www.enneagraminstitute.com/how-the-enneagram-system-works/). Bu uygulama kurumla bağlantılı değildir ve resmi RHETI testi değildir.

## Vercel yayını

Mevcut `ennegram-f25z` projesinde **Other** çerçevesi, `npm run build` komutu ve `dist` çıktı klasörü kullanılır. `vercel.json` bu ayarları açıkça belirtir. Statik dosyalar Vercel Hobby üzerinde çalışabilir; uygulama ücretli hizmet veya ücretli çalışma zamanı gerektirmez. Hesabın barındırma limitleri ayrıca geçerlidir.

GitHub'da `main` dalına push, mevcut Vercel Git entegrasyonu üzerinden yayınlanabilir. Yetkili CLI ile doğrudan yayın için:

```sh
vercel link --project ennegram-f25z
vercel --prod
```

`.env*`, `.vercel/`, kullanıcı verileri ve test çıktıları hem Git hem Vercel kaynak paketinin dışında tutulur. Eski `/enneagram.html` adresi ana sayfaya yönlendirilir.
