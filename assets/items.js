export { PAIRS } from "./pairs.js";
const L = (type, n, tr, en, reverse = false) => ({
    id: `l${type}${n}`,
    type,
    text: { tr, en },
    reverse,
});
export const LIKERT = [
    // 1 — reformcu
    L(1, 1, "Hata yapmış olmak, içten içe kötü biri olmuşum gibi hissettirir.", "Having made a mistake makes me feel, deep down, like a bad person."),
    L(1, 2, "İçimde yaptığım her şeyi denetleyen, neyin daha doğru olabileceğini söyleyen bir ses var.", "There's a voice in me that checks everything I do and says how it could be more right."),
    L(1, 3, "Kendi kurallarımı çiğnediğimde, bunu yalnızca ben bilsem bile vicdanım sızlar.", "When I break my own rules, my conscience aches even if only I know."),
    L(1, 4, "Özensiz ya da yanlış yapılmış bir işi görünce, düzeltilene kadar aklım ona takılır.", "When I see sloppy or wrong work, my mind stays stuck on it until it's fixed."),
    L(1, 5, "Bir yere girdiğimde ilk gözüme çarpan, eğri duran ya da yanlış olan şeylerdir.", "Walking into a place, what catches my eye first is whatever is crooked or wrong."),
    L(1, 6, "Kızdığımda bunu içimde tutarım; sonra tahammülsüzlük olarak dışarı sızar.", "When I'm angry I keep it in, and it leaks out later as impatience."),
    L(1, 7, "Başkalarının gevşekliği karşısında içimde sessiz bir kızgınlık birikir.", "Other people's carelessness builds up a quiet resentment in me."),
    L(1, 8, "Bir işi \"yeterince iyi\" noktasında bırakıp rahatça başka şeye geçebilirim.", "I can leave a task at \"good enough\" and move on easily.", true),
    // 2 — yardımsever
    L(2, 1, "Sevilmek için bir şeyler vermem, işe yaramam gerektiğini hissederim.", "I feel I have to give something, be useful, in order to be loved."),
    L(2, 2, "İnsanların hayatında önemli, hatta vazgeçilmez biri olmak bana iyi gelir.", "Being important, even indispensable, in people's lives feels good to me."),
    L(2, 3, "Birinin bana artık ihtiyaç duymadığını sezmek beni derinden sarsar.", "Sensing that someone no longer needs me shakes me deeply."),
    L(2, 4, "Başkalarının ihtiyacını, kendi ihtiyacımdan çok önce fark ederim.", "I notice other people's needs long before I notice my own."),
    L(2, 5, "Bir ortama girince kimin keyifsiz olduğunu, kimin neye ihtiyacı olduğunu hemen sezerim.", "Walking into a room, I sense right away who's down and who needs what."),
    L(2, 6, "Emeğim karşılıksız kalınca, dışarıdan umursamaz görünsem de içten içe kırılırım.", "When my effort goes unreturned, I look like I don't care but I'm hurt inside."),
    L(2, 7, "Başkasına yardım etmek kolay; kendi ihtiyacımı söylemek ya da yardım istemek zor.", "Helping others is easy. Saying what I need, or asking for help, is hard."),
    L(2, 8, "Kendi işime odaklanırım; başkalarının ihtiyaçlarını ancak açıkça söylediklerinde fark ederim.", "I focus on my own things and notice others' needs only when they spell them out.", true),
    // 3 — başarı odaklı
    L(3, 1, "Kendimi en değerli, bir şey başardığımda ve bu görüldüğünde hissederim.", "I feel most worthwhile when I've achieved something and it's been seen."),
    L(3, 2, "Başarılarım durduğunda kendimi değersiz hissetmeye başlarım.", "When my achievements stall, I start to feel worthless."),
    L(3, 3, "Başarısız görünmek, başarısız olmaktan bile daha çok canımı sıkar.", "Looking like I failed bothers me even more than failing itself."),
    L(3, 4, "Bir ortamda nasıl görünmem gerektiğini sezer, kendimi ona göre ayarlarım.", "I sense what image works in a setting and adjust myself to it."),
    L(3, 5, "Günümü, ne kadarını hallettiğime bakarak değerlendiririm.", "I judge my day by how much I got done."),
    L(3, 6, "Duygularımı çoğu zaman sonraya bırakırım; önce iş halledilmeli.", "I often put my feelings on hold. The job comes first."),
    L(3, 7, "Olduğumdan daha başarılı ya da emin görünmek için kendimi biraz parlattığım olur.", "I sometimes polish myself up to look more successful or sure than I am."),
    L(3, 8, "Takdir edilsem de edilmesem de aynı hevesle çalışırım.", "I work with the same drive whether anyone recognises it or not.", true),
    // 4 — bireyci
    L(4, 1, "Sıradan ya da herkes gibi olmak, bana neredeyse kendimi kaybetmek gibi gelir.", "Being ordinary, just like everyone else, feels almost like losing myself."),
    L(4, 2, "Yaptığım şeyin kim olduğumu yansıtması benim için çok önemlidir.", "It matters a great deal to me that what I do reflects who I am."),
    L(4, 3, "Beni gerçekten anlayan birinin eksikliğini sık sık derinden hissederim.", "I often feel deeply the lack of someone who truly understands me."),
    L(4, 4, "Başkalarında olan temel bir şeyin bende eksik olduğunu sık sık hissederim.", "I often feel something essential that others have is missing in me."),
    L(4, 5, "Hüzün bana tanıdık gelir; melankolinin içinde bir derinlik, bir güzellik bulurum.", "Sadness feels familiar. I find depth, even beauty, in melancholy."),
    L(4, 6, "Başkalarının sahip olduklarına içten içe imrenir, kendimi onlarla kıyaslarım.", "I secretly envy what others have and measure myself against them."),
    L(4, 7, "Ruh halim, o gün ne yapacağımı büyük ölçüde belirler.", "My mood largely decides what I'll do that day."),
    L(4, 8, "Kendimi çoğu insana benzer biri olarak görürüm ve bu bana iyi gelir.", "I see myself as pretty similar to most people, and I'm glad of it.", true),
    // 5 — araştırmacı
    L(5, 1, "Bir konuda hazırlıksız ya da bilgisiz yakalanmak en sevmediğim şeydir.", "Being caught unprepared or uninformed is the thing I like least."),
    L(5, 2, "Harekete geçmeden önce bir şeyi iyice anlamam gerekir.", "Before I act, I need to understand the thing properly."),
    L(5, 3, "Kendi kendime yetebilmek benim için neredeyse her şeyden önemlidir.", "Being self-sufficient matters to me more than almost anything."),
    L(5, 4, "İnsanlar zamanımdan ya da enerjimden fazlasını isteyince geri çekilip yalnız toparlanırım.", "When people want too much of my time or energy, I withdraw and recharge alone."),
    L(5, 5, "Bir grupta katılmaktan çok kenardan izlemeyi, gözlemlemeyi seçerim.", "In a group I'd rather watch from the edge than jump in."),
    L(5, 6, "Duygularımı o an yaşamak yerine sonra, tek başıma kafamda işlerim.", "Rather than feel things in the moment, I process them later, alone, in my head."),
    L(5, 7, "Zamanımı, enerjimi ve özelimi sıkı sıkı korurum; paylaşmak beni yorar.", "I guard my time, energy and privacy tightly. Sharing them wears me out."),
    L(5, 8, "Saatlerce insanlarla vakit geçirip yine de enerjim yerinde kalabilir.", "I can spend hours with people and still have plenty of energy left.", true),
    // 6 — sadık
    L(6, 1, "Kendimi güvende hissetmem için güvenebileceğim insanlara ve sağlam bir düzene ihtiyaç duyarım.", "To feel safe, I need people I can count on and solid ground under me."),
    L(6, 2, "Karar verirken kendimden şüphe ederim; güvendiğim birine danışmak içimi rahatlatır.", "I doubt myself when I decide. Checking with someone I trust puts me at ease."),
    L(6, 3, "Otoriteyle aram ikircikli: bir yanım güvenmek ister, bir yanım sorgular.", "I'm torn about authority. Part of me wants to trust it, part of me questions it."),
    L(6, 4, "Bir şeye bağlanmadan önce nelerin ters gidebileceğini zihnimde tek tek geçiririm.", "Before I commit to something, I run through everything that could go wrong."),
    L(6, 5, "Her şey yolundayken bile içimin bir köşesi tetikte kalır.", "Even when all is well, a corner of me stays on alert."),
    L(6, 6, "Birine ya da bir kuruma tam güvenmeden önce onu bir süre sınarım.", "Before I fully trust a person or an institution, I test them for a while."),
    L(6, 7, "İnsanların söylediklerinin altında gizli bir niyet arar, şüphelenirim.", "I look for hidden motives behind what people say, and I get suspicious."),
    L(6, 8, "Bir şey ters giderse o an çözerim; önceden kafa yormayı gereksiz bulurum.", "If something goes wrong I'll handle it then. Worrying ahead feels pointless.", true),
    // 7 — maceracı
    L(7, 1, "Seçeneklerimin kısılması ya da tek bir şeye bağlanmak zorunda kalmak beni bunaltır.", "Having my options cut, or being tied to just one thing, makes me feel trapped."),
    L(7, 2, "Hayatın sunduğu güzel şeyleri kaçırıyor olma hissi beni rahatsız eder.", "The feeling that I might be missing the good things in life really bugs me."),
    L(7, 3, "Canımı acıtan bir durumda zihnim hemen yeni bir plana ya da işin iyi yanına kayar.", "When something hurts, my mind jumps straight to a new plan or the bright side."),
    L(7, 4, "Aklım hep bir sonraki plana, fikre ya da deneyime koşar.", "My mind keeps racing ahead to the next plan, idea or experience."),
    L(7, 5, "Hayatımı heyecan verici planlarla, seçeneklerle dolu tutarım.", "I keep my life full of exciting plans and options."),
    L(7, 6, "Bir sürü şeye başlarım; heyecan geçince bitirmek zorlaşır.", "I start lots of things. Once the excitement fades, finishing gets hard."),
    L(7, 7, "Kötü giden bir şeyi hızla olumlu bir hikâyeye çeviririm, bazen fazla hızlı.", "I turn things that went badly into a positive story fast, sometimes too fast."),
    L(7, 8, "Keyifsiz ama gerekli bir işe saatlerce rahatça odaklanabilirim.", "I can focus for hours on dull but necessary work, no problem.", true),
    // 8 — meydan okuyan
    L(8, 1, "Biri beni ya da sevdiklerimi kontrol etmeye, ezmeye kalkınca hemen karşısına dikilirim.", "When someone tries to control or push around me or my people, I stand up to them right away."),
    L(8, 2, "Başkalarının önünde zayıf görünmek bana tehlikeli gelir; incindiğimi saklarım.", "Looking weak in front of others feels dangerous. I hide it when I'm hurt."),
    L(8, 3, "Kontrol başkasının elindeyken huzursuzlanırım; kararları ben vermek isterim.", "I get restless when someone else is in control. I want to make the calls."),
    L(8, 4, "Bir ortama girince gücün kimin elinde olduğunu hemen fark ederim.", "When I walk in somewhere, I clock right away who holds the power."),
    L(8, 5, "Haksızlık gördüğümde bunu kişisel bir mesele gibi hisseder, hemen araya girerim.", "When I see injustice I take it personally and step in at once."),
    L(8, 6, "Bir şeyi istediğimde tüm gücümle üzerine giderim, bazen fazlasıyla.", "When I want something I go at it with everything I've got, sometimes too much."),
    L(8, 7, "İnsanlar bazen fazla sert olduğumu, onları ezip geçtiğimi söyler.", "People sometimes tell me I'm too harsh, that I steamroll them."),
    L(8, 8, "Biri bana ne yapacağımı söylediğinde genelde rahatça uyum sağlarım.", "When someone tells me what to do, I usually go along easily.", true),
    // 9 — barışçı
    L(9, 1, "Bir anlaşmazlıkta kendi fikrimi savunmak yerine ortamı yumuşatmayı seçerim.", "In a disagreement I'd rather smooth things over than push my own view."),
    L(9, 2, "Çatışma ve gerginlik beni çoğu insandan daha fazla yorar ve dağıtır.", "Conflict and tension wear me out and scatter me more than most people."),
    L(9, 3, "Huzurum bozulmasın diye beni rahatsız eden şeyleri görmezden gelirim.", "To keep my peace, I tend to ignore the things that bother me."),
    L(9, 4, "Çoğu zaman başkalarına uyarım; ne istediğimi ancak sonradan fark ederim.", "I often go along with others and only later realise what I wanted."),
    L(9, 5, "Bir grupta herkesin bakış açısını anlarım, kendi görüşümü bulmakta ise zorlanırım.", "In a group I can see everyone's point of view, but struggle to find my own."),
    L(9, 6, "Önemli bir iş beklerken kendimi önemsiz ufak işlerle oyalanırken bulurum.", "When something important is waiting, I catch myself busy with small, unimportant things."),
    L(9, 7, "Biri bana baskı yapınca açık bir \"hayır\" yerine sessizce kendi bildiğimi yaparım.", "When someone pressures me, instead of a clear \"no\" I quietly do it my own way."),
    L(9, 8, "Bir anlaşmazlıkta gerginlik yaratsa bile ne istediğimi açıkça söylerim.", "In a disagreement I say clearly what I want, even if it creates tension.", true),
];
// Too-good-to-be-true claims; high agreement flags an idealized self-portrait.
export const IMPRESSION = [
    { id: "im1", text: { tr: "Her zaman herkese karşı sabırlıyımdır.", en: "I'm always patient with everyone." } },
    { id: "im2", text: { tr: "Tanıdığım herkesi istisnasız severim.", en: "I like everyone I know, without exception." } },
];
export const PARAGRAPHS = {
    1: {
        tr: "Hayatım boyunca işlerin doğru yapılmasına önem verdim. İçimde neyin düzeltilmesi gerektiğini gösteren bir ses var ve bu ses en çok bana karşı acımasız. Sorumlu, düzgün ve dürüst olmak benim için çok önemli. Hata yapmak beni derinden rahatsız eder; öfkemi genelde içimde tutarım ama tahammülsüzlük olarak dışarı sızar.",
        en: "All my life I've cared about things being done right. There's a voice inside me that shows what needs fixing, and it's harshest on me. Being responsible, decent and honest matters enormously. Getting things wrong bothers me deeply; I usually keep my anger in, but it leaks out as impatience.",
    },
    2: {
        tr: "Başkalarının neye ihtiyacı olduğunu hemen sezerim ve yardım etmek içimden gelir. İnsanların hayatında önemli ve sevilen biri olmak bana iyi gelir. Kendi ihtiyaçlarımı söylemekte ise zorlanırım; verdiğim emek karşılıksız kalınca içten içe kırılırım. Sevildiğimi hissetmek, çoğu şeyden daha önemli.",
        en: "I pick up on what other people need right away, and helping comes naturally. Being important and loved in people's lives feels good. Saying what I need is harder, and when my effort goes unreturned it quietly hurts. Feeling loved matters more than most things.",
    },
    3: {
        tr: "Hedef koymak, başarmak ve bunun görülmesi beni harekete geçirir. Bir ortamda neyin takdir edildiğini hızla anlar ve o olmaya çalışırım. Verimli ve yetkin görünmek önemli; başarısız görünmek beni çok rahatsız eder. Duygularımı genelde sonraya bırakırım, önce iş halledilmeli.",
        en: "Setting goals, reaching them and having that seen is what gets me going. I quickly work out what a room admires and become it. Looking capable and effective matters; looking like a failure really gets to me. My feelings usually wait until the work is done.",
    },
    4: {
        tr: "Kendimi çoğu zaman başkalarından farklı, biraz da yanlış anlaşılmış hissederim. Duygularım derin ve yoğun; hüzün bile bana anlamlı gelebilir. Sıradan bir hayat istemem, kim olduğumu yansıtan özgün bir hayat ararım. Başkalarında olup bende eksik olan bir şey varmış hissi sık sık içimde dolaşır.",
        en: "I often feel different from other people, and a little misunderstood. My feelings run deep and strong; even sadness can feel meaningful. I want a life that reflects who I really am, not an ordinary one. There's a recurring sense that something others have is missing in me.",
    },
    5: {
        tr: "Önce anlamak isterim: gözlemlemek, okumak, bir şeyi kafamda çözmek bana iyi gelir. Zamanımı, enerjimi ve özel alanımı korurum; insanlar fazla talepte bulununca geri çekilirim. Az şeyle yetinebilirim. Duygularımı genelde sonra, tek başıma işlerim. Yetersiz ya da çaresiz kalmak en sevmediğim şey.",
        en: "I want to understand first: watching, reading, working something out in my head suits me. I guard my time, energy and privacy, and pull back when people ask too much. I can live on little. I process feelings later, on my own. Being incapable or helpless is what I like least.",
    },
    6: {
        tr: "Kafam olası tehlikeleri ve \"ya şöyle olursa\"ları önceden görmeye ayarlı. Güvenebileceğim insanlar ve sağlam bir düzen benim için çok önemli; güvenmeden önce sınarım. Hem kendimden şüphe ederim hem otoriteyi sorgularım. Bazen korktuğum şeyin üzerine bile bile giderim. Güvende hissetmek her şeyden önce gelir.",
        en: "My mind is tuned to spot risks and \"what ifs\" in advance. People I can rely on and solid ground under me matter a lot, and I test before I trust. I doubt myself and I question authority. Sometimes I walk straight at the thing I fear. Feeling secure comes before everything.",
    },
    7: {
        tr: "Hayat keşfedilecek bir sürü şeyle dolu ve ben hepsini denemek isterim. Aklım hep bir sonraki plana, fikre, deneyime koşar. Sıkıcı ya da canımı yakan şeylerle uzun süre kalmak yerine dikkatimi daha iyi bir şeye çeviririm. Seçeneklerimin kısıtlanması, kapana kısılmış hissetmek bana en zor gelen şey.",
        en: "Life is full of things to explore and I want to try them all. My mind keeps running to the next plan, idea, experience. Instead of staying with what's dull or painful, I move my attention somewhere better. Having my options limited, feeling trapped, is the hardest thing for me.",
    },
    8: {
        tr: "Güçlü, dolaysız ve kararlıyım; ne düşündüğümü açıkça söylerim. Kimsenin beni ya da sevdiklerimi kontrol etmesine izin vermem, gerekirse karşı dururum. Zayıf görünmekten hoşlanmam, incindiğimi saklarım. Bir şeyi istediğimde tüm enerjimle üzerine giderim, bazen fazlasıyla; kontrolün bende olması bana güven verir.",
        en: "I'm strong, direct and decisive, and I say what I think. I don't let anyone control me or my people, and I'll push back if I have to. I don't like looking weak and I hide it when I'm hurt. When I want something I go at it with everything, sometimes too much; being in control is what makes me feel safe.",
    },
    9: {
        tr: "Huzur benim için çok önemli, hem içimde hem çevremde. Çatışmadan kaçınır, herkesin tarafını anlamaya ve ortamı yumuşatmaya çalışırım. Başkalarının istediğine uymak, kendi ne istediğimi bulmaktan çoğu zaman daha kolay. Önemli işleri erteleyip ufak şeylerle oyalanabilirim; baskı görünce de sessizce kendi bildiğimi yaparım.",
        en: "Peace matters a lot to me, inside and around me. I avoid conflict and try to see everyone's side and calm things down. Going along with others is often easier than knowing what I want. I can put off what matters and drift into small things; when pushed, I quietly do it my own way.",
    },
};
