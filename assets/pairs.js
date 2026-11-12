let n = 0;
const P = (a, b, trA, trB, enA, enB) => ({
    id: `p${a}${b}${++n}`,
    a,
    b,
    textA: { tr: trA, en: enA },
    textB: { tr: trB, en: enB },
});
export const PAIRS = [
    // 1 · 2
    P(1, 2, "Birine iyilik yaparken beni asıl harekete geçiren, doğru olanı yapmak.", "Birine iyilik yaparken beni asıl harekete geçiren, o kişiyle aramdaki bağ.", "When I do someone a favour, what really moves me is doing the right thing.", "When I do someone a favour, what really moves me is the bond between us."),
    P(1, 2, "Eleştirildiğimde en çok, haklı olup olmadıkları kafama takılır.", "Eleştirildiğimde en çok, beni hâlâ sevip sevmedikleri kafama takılır.", "When I'm criticised, what sticks with me is whether they were right.", "When I'm criticised, what sticks with me is whether they still like me."),
    P(1, 2, "Bir ilişkide beni en çok yaralayan, haksızlık ve tutarsızlık.", "Bir ilişkide beni en çok yaralayan, ilgisizlik ve soğukluk.", "What hurts me most in a relationship is unfairness and inconsistency.", "What hurts me most in a relationship is indifference and coldness."),
    // 1 · 3  (often confused)
    P(1, 3, "Bir işi, yalnızca ben görecek olsam da kurallarına uygun ve düzgün yaparım.", "Bir işi en hızlı ve etkili şekilde sonuca bağlarım; yöntem esneyebilir.", "I do a job properly and by the rules, even if I'm the only one who'll see it.", "I get a job to its result as fast and effectively as possible; the method can bend."),
    P(1, 3, "İyi bir iş çıkardığımda asıl tatmin, içimdeki standardı tutturmak.", "İyi bir iş çıkardığımda asıl tatmin, bunun görülmesi ve takdir edilmesi.", "When I do good work, the real satisfaction is meeting my own standard.", "When I do good work, the real satisfaction is having it seen and recognised."),
    P(1, 3, "Bir şey için çok çalıştığımda en önemlisi, olması gerektiği gibi yapılmış olması.", "Bir şey için çok çalıştığımda en önemlisi, başarıya ulaşması ve öyle görülmesi.", "When I work hard on something, what matters most is that it's done the way it should be.", "When I work hard on something, what matters most is that it succeeds and is seen as a success."),
    // 1 · 4
    P(1, 4, "Duygularımı işimin dışında tutar, önce doğru olanı yaparım.", "Duygularımı bir kenara itmek bana sahte gelir; önce ne hissettiğime bakarım.", "I keep my feelings out of the work and do what's right first.", "Pushing my feelings aside feels fake. I check what I feel first."),
    P(1, 4, "Bir şeyi eleştirirken aklımdaki, onun nasıl olması gerektiği.", "Bir şeyi eleştirirken aklımdaki, onda neyin eksik ya da ruhsuz olduğu.", "When I criticise something, I'm thinking about how it should be.", "When I criticise something, I'm thinking about what's missing or soulless in it."),
    // 1 · 5
    P(1, 5, "Bir sorun görünce onu düzeltmek için harekete geçmem gerektiğini hissederim.", "Bir sorun görünce önce onu tam anlamak isterim; müdahale etmek sonra gelir.", "When I see a problem, I feel I have to act and fix it.", "When I see a problem, I first want to fully understand it. Stepping in comes later."),
    P(1, 5, "Beni en çok, yanlış bir şey yapmış olmak rahatsız eder.", "Beni en çok, bir konuda yetersiz ya da bilgisiz kalmak rahatsız eder.", "What bothers me most is having done something wrong.", "What bothers me most is being out of my depth or uninformed."),
    // 1 · 6  (often confused)
    P(1, 6, "Neyin doğru olduğundan genelde eminim; sorun, başkalarının buna uymaması.", "Neyin doğru olduğundan çoğu zaman şüphe ederim; o yüzden danışır, iki kez kontrol ederim.", "I'm usually sure what's right. The problem is others not following it.", "I often have doubts about what's right, so I ask around and double-check."),
    P(1, 6, "Kurallara uyarım çünkü içimdeki ahlak duygusu bunu söyler.", "Kurallara uyarım çünkü bana ve çevreme güvenlik sağlarlar.", "I follow rules because my inner sense of right tells me to.", "I follow rules because they keep me and the people around me safe."),
    P(1, 6, "İçimi en çok kaplayan his, işlerin olması gerektiği gibi gitmemesine duyduğum öfke.", "İçimi en çok kaplayan his, bir şeylerin ters gidebileceğine dair kaygı.", "The feeling that fills me most is anger that things aren't as they should be.", "The feeling that fills me most is worry that something might go wrong."),
    // 1 · 7
    P(1, 7, "Önce iş, sonra keyif.", "Keyfi hep ertelersem hayat elimden kaçıp gidiyormuş gibi gelir.", "Work first, then fun.", "If I keep postponing the fun, it feels like life is slipping away."),
    P(1, 7, "Bir plan bozulunca en çok işlerin düzeninin bozulmasına takılırım.", "Bir plan bozulunca hemen daha ilginç bir alternatif ararım.", "When a plan falls apart, what bugs me is the mess it leaves.", "When a plan falls apart, I immediately look for a more interesting alternative."),
    // 1 · 8  (often confused)
    P(1, 8, "Öfkemi çoğu zaman dizginlerim; kontrolsüz öfke bana yakışmaz.", "Öfkemi olduğu gibi gösteririm; kızdıysam karşımdaki bunu hemen anlar.", "I usually rein in my anger. Losing it isn't who I want to be.", "I show my anger as it is. If I'm mad, the other person knows right away."),
    P(1, 8, "Bir tartışmada benim için önemli olan, kimin haklı olduğu.", "Bir tartışmada benim için önemli olan, kimsenin beni ezmemesi.", "In an argument, what matters to me is who's right.", "In an argument, what matters to me is that nobody gets to push me around."),
    P(1, 8, "Güç, doğru amaç için kullanıldığında bana anlamlı gelir.", "Güç bana doğal gelir; onsuz kendimi korumasız hissederim.", "Power only means something to me when it serves the right cause.", "Power comes naturally to me. Without it I feel exposed."),
    // 1 · 9
    P(1, 9, "Bir şeyin yanlış olduğunu düşünüyorsam ortam gerilse de söylerim.", "Bir şeyin yanlış olduğunu düşünsem de ortam gerilecekse genelde kendime saklarım.", "If I think something is wrong I'll say it, even if the mood gets tense.", "Even if I think something is wrong, I usually keep it to myself if it'll create tension."),
    P(1, 9, "Beni asıl yoran, işlerin doğru yapılmaması.", "Beni asıl yoran, çatışma ve gerginlik.", "What really wears me out is things not being done right.", "What really wears me out is conflict and tension."),
    P(1, 9, "Yanlış giden bir şey, düzeltene kadar içimi kemirir.", "Yanlış giden bir şeyi, üzerine gitmek sürtüşme yaratacaksa olduğu gibi bırakabilirim.", "Something going wrong gnaws at me until I fix it.", "If fixing something would cause friction, I can leave it as it is."),
    // 2 · 3
    P(2, 3, "Bir ortamda en çok sevilen kişi olmak isterim.", "Bir ortamda en çok takdir edilen, başarılı kişi olmak isterim.", "In a group, I'd like to be the most loved person.", "In a group, I'd like to be the most respected, successful person."),
    P(2, 3, "Enerjimin çoğunu yakınlarımın ihtiyaçlarına harcarım.", "Enerjimin çoğunu hedeflerime ve işime harcarım.", "Most of my energy goes to the needs of people close to me.", "Most of my energy goes to my goals and my work."),
    P(2, 3, "Beni en çok, sevdiklerimin gözünde gereksiz hale gelmek acıtır.", "Beni en çok, başkalarının gözünde başarısız görünmek acıtır.", "What hurts most is becoming unnecessary to the people I love.", "What hurts most is looking like a failure in other people's eyes."),
    // 2 · 4
    P(2, 4, "Biriyle birlikteyken onun nasıl hissettiğine odaklanırım.", "Biriyle birlikteyken onun yanında kendimin nasıl hissettiğine odaklanırım.", "When I'm with someone, I focus on how they're feeling.", "When I'm with someone, I focus on how I feel around them."),
    P(2, 4, "Kendi dertlerimi genelde bir kenara koyar, başkasına yardım ederim.", "Kendi dertlerimi bir kenara koymak bana sahte gelir; önce onları anlamam gerekir.", "I usually set my own troubles aside and help someone else.", "Setting my own troubles aside feels fake. I need to understand them first."),
    P(2, 4, "Başkalarının ihtiyaçlarına odaklanır, kendi ihtiyaçlarımı unuturum.", "Kendi duygularıma odaklanır, gerçekten anlaşılmayı özlerim.", "I focus on what others need and forget my own needs.", "I focus on my own feelings and long to be truly understood."),
    // 2 · 5
    P(2, 5, "İnsanlara yakın olmak ve kalbimi açmak bana enerji verir.", "İnsanlarla yakınlık kısa sürede enerjimi tüketir; geri çekilmem gerekir.", "Being close to people and opening up gives me energy.", "Closeness with people drains me quickly. I need to pull back."),
    P(2, 5, "Birinin bana ihtiyaç duyması beni değerli hissettirir.", "Birinin bana fazla ihtiyaç duyması beni boğar.", "Being needed by someone makes me feel valuable.", "Being needed too much by someone smothers me."),
    // 2 · 6
    P(2, 6, "İlişkilerde en çok sevildiğimi hissetmek isterim.", "İlişkilerde en çok güvenebileceğimi bilmek isterim.", "In relationships, what I want most is to feel loved.", "In relationships, what I want most is to know I can rely on them."),
    P(2, 6, "İnsanlara hemen yakınlık gösterir, kalbimi açarım.", "İnsanlara yakınlık göstermeden önce güvenip güvenemeyeceğimi tartarım.", "I warm up to people quickly and open my heart.", "Before I warm up to someone, I weigh whether I can trust them."),
    P(2, 6, "Sadık ve yardımsever olmamın asıl nedeni, ihtiyaç duyulmanın bana sevildiğimi hissettirmesi.", "Sadık ve yardımsever olmamın asıl nedeni, güvenilir bir bağın parçası olmanın bana güven vermesi.", "I'm loyal and helpful mainly because being needed makes me feel loved.", "I'm loyal and helpful mainly because belonging to a reliable bond makes me feel safe."),
    // 2 · 7
    P(2, 7, "Bir partide en çok, insanların iyi vakit geçirip geçirmediğiyle ilgilenirim.", "Bir partide en çok, yeni insanlar ve yeni heyecanlarla ilgilenirim.", "At a party, I'm most tuned in to whether people are having a good time.", "At a party, I'm most tuned in to new people and new thrills."),
    P(2, 7, "Mutlu olmam için sevdiklerimin iyi olması gerekir.", "Mutlu olmam için özgür olmam ve yeni şeyler yaşamam gerekir.", "To be happy, I need the people I love to be okay.", "To be happy, I need to be free and to keep experiencing new things."),
    P(2, 7, "Kendimi en iyi, insanlar bana güvenip yaslandığında hissederim.", "Kendimi en iyi, özgürce hareket edebildiğimde hissederim.", "I feel best when people rely and lean on me.", "I feel best when I'm free to move as I like."),
    // 2 · 8
    P(2, 8, "Birine yardım ederken, onun için ne kadar önemli olduğumu fark etmesini isterim.", "Birine yardım ederken, ona sahip çıktığımı ve koruduğumu hissetmek isterim.", "When I help someone, I want them to notice how much I matter to them.", "When I help someone, I want to feel that I've got their back and I'm protecting them."),
    P(2, 8, "Reddedilmek beni çok derinden yaralar.", "Kontrol edilmek beni çok derinden kızdırır.", "Being rejected wounds me deeply.", "Being controlled angers me deeply."),
    // 2 · 9  (often confused)
    P(2, 9, "Başkalarına uyum sağlarım çünkü onlar için önemli biri olmak isterim.", "Başkalarına uyum sağlarım çünkü gerginlik çıkmasın isterim.", "I go along with others because I want to matter to them.", "I go along with others because I want to avoid tension."),
    P(2, 9, "Birine destek olurken araya girer, işi üstlenirim.", "Birine destek olurken geri planda kalır, yanında sakin bir varlık olurum.", "When I support someone, I step in and take things on.", "When I support someone, I stay in the background as a calm presence."),
    P(2, 9, "Emeğim görülmezse kırılırım.", "Emeğim görülsün görülmesin, yeter ki ortam huzurlu olsun.", "If my effort goes unseen, I'm hurt.", "Seen or unseen, my effort matters less to me than things being peaceful."),
    // 3 · 4  (often confused)
    P(3, 4, "İnsanların beni nasıl gördüğünü duruma göre ayarlayabilirim.", "Kendimi insanların beklentisine göre ayarlamak bana sahte gelir.", "I can adjust how people see me depending on the situation.", "Adjusting myself to what people expect feels fake to me."),
    P(3, 4, "Duygular işimi yapmama engel olursa onları bir kenara koyarım.", "Duygularımı bir kenara koyamam; onlar kim olduğumun parçası.", "If feelings get in the way of getting things done, I put them aside.", "I can't put my feelings aside. They're part of who I am."),
    P(3, 4, "En çok başarılı olmak isterim.", "En çok özgün ve özel olmak isterim.", "More than anything, I want to be successful.", "More than anything, I want to be authentic and one of a kind."),
    // 3 · 5
    P(3, 5, "Yaptığım işi görünür kılmak, göstermek isterim.", "Yaptığım işi göstermek yerine arka planda iyice anlamayı tercih ederim.", "I want my work to be visible, and I like showing it.", "Rather than show my work, I prefer to understand it deeply behind the scenes."),
    P(3, 5, "Hızlı hareket etmek, her şeyi bilmekten önce gelir.", "Yeterince bilmeden harekete geçmek bana huzursuz gelir.", "Moving fast comes before knowing everything.", "Acting before I know enough makes me uneasy."),
    // 3 · 6
    P(3, 6, "Kendime güvenirim ve bunu göstermekten çekinmem.", "Kendime güvenmekten çok, güvendiğim bir ekibe ya da düzene yaslanırım.", "I believe in myself and I'm not shy about showing it.", "Rather than rely on myself, I lean on a team or a system I trust."),
    P(3, 6, "Beni harekete geçiren, hedefe ulaşmak.", "Beni harekete geçiren, güvende olmak ve risklere hazırlıklı olmak.", "What drives me is reaching the goal.", "What drives me is being safe and ready for the risks."),
    // 3 · 7  (often confused)
    P(3, 7, "Bir şeye başlarım çünkü onu başarıp sonucunu görmek isterim.", "Bir şeye başlarım çünkü yeni ve heyecan verici geliyor.", "I start something because I want to pull it off and see the result.", "I start something because it feels new and exciting."),
    P(3, 7, "Sıkıcı bir işe katlanırım, yeter ki beni hedefe götürsün.", "Sıkıcı bir işe katlanmakta zorlanırım; hemen daha ilginç bir yol ararım.", "I'll put up with dull work as long as it gets me to the goal.", "I struggle to put up with dull work. I look for a more interesting route right away."),
    P(3, 7, "En kötüsü, başkalarının gözünde başarısız görünmek.", "En kötüsü, sıkışıp kalmak ve seçeneksiz kalmak.", "The worst thing is looking like a failure in other people's eyes.", "The worst thing is being stuck with no options."),
    // 3 · 8  (often confused)
    P(3, 8, "Liderlik ederken insanların beni takdir etmesi önemli.", "Liderlik ederken önemli olan işin olmasıdır; takdir ikinci planda kalır.", "When I lead, it matters that people respect and admire me.", "When I lead, what matters is getting it done. Admiration comes second."),
    P(3, 8, "Karşımdaki kişiye göre tarzımı değiştiririm.", "Karşımda kim olursa olsun aynı dolaysız tarzla konuşurum.", "I change my style depending on who I'm talking to.", "Whoever I'm talking to, I use the same direct style."),
    P(3, 8, "Biri hedefimin önüne geçtiğinde, onu kazanmak ya da etrafından dolaşmak için yaklaşımımı ayarlarım.", "Biri hedefimin önüne geçtiğinde, doğrudan karşısına dikilirim.", "When someone blocks my goal, I adjust my approach to win them over or get around them.", "When someone blocks my goal, I confront them head-on."),
    // 3 · 9
    P(3, 9, "Hedeflerim beni hep hareket halinde tutar.", "Acele etmeden, kendi ritmimde ilerlemeyi severim.", "My goals keep me constantly on the move.", "I like to move at my own pace, without rushing."),
    P(3, 9, "Başkalarının gözünde bir şey olmak için çalışırım.", "Başkalarının gözünde bir şey olmaktan çok huzurlu olmayı önemserim.", "I work to be someone in other people's eyes.", "Being at peace matters more to me than being someone in others' eyes."),
    // 4 · 5  (often confused)
    P(4, 5, "Geri çekildiğimde duygularımın içine dalarım.", "Geri çekildiğimde düşüncelerimin ve ilgilendiğim konuların içine dalarım.", "When I withdraw, I sink into my feelings.", "When I withdraw, I sink into my thoughts and my interests."),
    P(4, 5, "Asıl istediğim anlaşılmak.", "Asıl istediğim anlamak.", "What I really want is to be understood.", "What I really want is to understand."),
    P(4, 5, "Bir deneyimde en önemli şey bana ne hissettirdiği.", "Bir deneyimde en önemli şey onun nasıl işlediğini kavramak.", "What matters most in an experience is how it makes me feel.", "What matters most in an experience is grasping how it works."),
    // 4 · 6  (often confused)
    P(4, 6, "İçimdeki huzursuzluk genelde bir eksiklik ve özlem hissi.", "İçimdeki huzursuzluk genelde bir kaygı ve tetikte olma hali.", "The restlessness in me is usually a sense of longing, of something missing.", "The restlessness in me is usually worry, a state of being on guard."),
    P(4, 6, "Bir gruba fazla uyum sağlamak kimliğimi silikleştirir gibi gelir.", "Güvendiğim bir grubun parçası olmak bana güç verir.", "Fitting in too much with a group feels like it blurs who I am.", "Being part of a group I trust makes me stronger."),
    P(4, 6, "Zor bir anda kafamı meşgul eden soru: \"bu bana ne hissettiriyor, ben kimim?\"", "Zor bir anda kafamı meşgul eden soru: \"ne olacak, kime güvenebilirim?\"", "In a hard moment, the question on my mind is: \"what is this making me feel, who am I?\"", "In a hard moment, the question on my mind is: \"what will happen, who can I trust?\""),
    // 4 · 7
    P(4, 7, "Acı veren bir duyguyla kalmak, onu anlamak için gerekli.", "Acı veren bir duyguda oyalanmak anlamsız; yoluma bakarım.", "Staying with a painful feeling is how I come to understand it.", "Lingering in a painful feeling is pointless. I move on."),
    P(4, 7, "Sık sık geçmişe, kaybettiklerime dönüp bakarım.", "Hep ileriye, olacak güzel şeylere bakarım.", "I often look back at the past, at what I've lost.", "I always look ahead, at the good things coming."),
    // 4 · 8
    P(4, 8, "Kırılganlığımı gösterebilirim; bu beni ben yapan şeylerden biri.", "Kırılganlığımı saklarım; güçlü durmam gerekir.", "I can show my vulnerability. It's part of what makes me me.", "I hide my vulnerability. I need to stay strong."),
    P(4, 8, "Yoğunluğum çoğunlukla içe, duygularıma dönük.", "Yoğunluğum çoğunlukla dışa, eyleme dönük.", "My intensity mostly turns inward, toward my feelings.", "My intensity mostly turns outward, toward action."),
    // 4 · 9
    P(4, 9, "Duygularım yoğundur ve onları olduğu gibi yaşarım.", "Duygularımı genelde yumuşatır, sakin kalırım.", "My feelings are intense and I live them as they are.", "I usually soften my feelings and stay calm."),
    P(4, 9, "Farklı olduğumu hissetmek isterim.", "Herkesle uyum içinde olduğumu hissetmek isterim.", "I want to feel that I'm different.", "I want to feel in harmony with everyone."),
    P(4, 9, "Duygularım dalgalandığında onları sonuna kadar yaşarım.", "Duygularım dalgalandığında onları yatıştırır, dengeye dönerim.", "When my feelings surge, I ride them all the way.", "When my feelings surge, I settle them and get back to balance."),
    // 5 · 6  (often confused)
    P(5, 6, "Bilgi toplarım çünkü bir konuyu kendi başıma kavramak isterim.", "Bilgi toplarım çünkü neyin ters gidebileceğini bilmek isterim.", "I gather information because I want to master a subject on my own.", "I gather information because I want to know what could go wrong."),
    P(5, 6, "Zor bir dönemde tek başıma kalıp düşünmek isterim.", "Zor bir dönemde güvendiğim insanlara yakın olmak isterim.", "In a hard time, I want to be alone and think.", "In a hard time, I want to be close to people I trust."),
    P(5, 6, "Otoriteyle aram mesafeli; kendi yolumu kendim bulurum.", "Otoriteyle aram yoğun; ya güvenirim ya sorgularım.", "I keep my distance from authority and find my own way.", "My relationship with authority is intense: I either trust it or question it."),
    // 5 · 7
    P(5, 7, "Tek bir konuya derinlemesine gömülmeyi severim.", "Bir sürü konuya dokunmayı, farklı şeyleri birleştirmeyi severim.", "I love burying myself deep in a single subject.", "I love dipping into lots of subjects and connecting different things."),
    P(5, 7, "Az şeyle yetinirim.", "Çok şey yaşamak isterim.", "I'm content with little.", "I want to experience a lot."),
    // 5 · 8
    P(5, 8, "Bir sorunla karşılaşınca önce geri çekilip düşünürüm.", "Bir sorunla karşılaşınca hemen üzerine giderim.", "When I hit a problem, I step back and think first.", "When I hit a problem, I go straight at it."),
    P(5, 8, "Enerjimi korumak için az taahhütte bulunurum.", "Enerjim bol; zorluklar beni ateşler.", "I commit to little so I can conserve my energy.", "I have plenty of energy. Challenges fire me up."),
    // 5 · 9  (often confused)
    P(5, 9, "Geri çekildiğimde zihnim çok aktiftir; bir şeyleri çözmekle meşgulümdür.", "Geri çekildiğimde zihnim sakinleşir; rahatlar, akışa bırakırım.", "When I withdraw, my mind is very active, busy working things out.", "When I withdraw, my mind goes quiet. I relax and let things drift."),
    P(5, 9, "Sınırlarımı net çizerim; alanıma girilmesinden hoşlanmam.", "Sınır çizmekte zorlanırım; genelde insanlara uyum sağlarım.", "I draw clear boundaries and dislike people entering my space.", "I find it hard to draw boundaries. I usually go along with people."),
    P(5, 9, "İlgimi çeken bir konuda keskin, dar bir odağım vardır.", "Dikkatim geniştir; birçok şeyi aynı anda, yumuşakça fark ederim.", "On a topic that grabs me, my focus is sharp and narrow.", "My attention is wide. I take in many things at once, softly."),
    // 6 · 7  (often confused)
    P(6, 7, "Bir plan yaparken önce neyin ters gidebileceğini düşünürüm.", "Bir plan yaparken önce ne kadar keyifli olacağını düşünürüm.", "When I plan something, I first think about what could go wrong.", "When I plan something, I first think about how much fun it'll be."),
    P(6, 7, "Kaygılandığımda güvendiğim birinden içimi rahatlatmasını beklerim.", "Kaygılandığımda kendimi hemen güzel bir şeyle oyalarım.", "When I'm anxious, I look to someone I trust to reassure me.", "When I'm anxious, I distract myself with something nice right away."),
    P(6, 7, "Bağlılık ve sadakat bana güven verir.", "Bağlanmak bazen beni kısıtlanmış hissettirir.", "Commitment and loyalty make me feel secure.", "Committing sometimes makes me feel boxed in."),
    // 6 · 8  (often confused)
    P(6, 8, "Karşı çıktığımda içimde bir güvensizlik vardır ve ona meydan okurum.", "Karşı çıktığımda içimde yalnızca kontrolü elime alma isteği vardır.", "When I push back, there's an insecurity in me that I'm defying.", "When I push back, all that's in me is the urge to take control."),
    P(6, 8, "Bir otoriteyi sorgularım çünkü ona güvenip güvenemeyeceğimi bilmek isterim.", "Bir otoriteyi sorgularım çünkü kimsenin bana üstünlük kurmasını istemem.", "I question authority because I want to know whether I can trust it.", "I question authority because I won't let anyone have the upper hand on me."),
    P(6, 8, "Zorlu bir durumda önce riskleri tartar, sonra harekete geçerim.", "Zorlu bir durumda önce harekete geçer, riskleri sonra düşünürüm.", "In a tough situation I weigh the risks first, then act.", "In a tough situation I act first and think about the risks later."),
    // 6 · 9  (often confused)
    P(6, 9, "Olası sorunları önceden düşünüp hazırlanırım.", "Olası sorunları akışına bırakırım; çoğu kendiliğinden hallolur.", "I think through possible problems in advance and get ready.", "I let possible problems take their course. Most sort themselves out."),
    P(6, 9, "İçimde bir uyanıklık vardır; olup biteni hep takip ederim.", "İçimde bir durgunluk vardır; olup biteni uzaktan, rahatça izlerim.", "There's an alertness in me. I keep track of everything going on.", "There's a stillness in me. I watch what's going on from a comfortable distance."),
    P(6, 9, "Olası bir sorun belirdiğinde zihnim senaryolar üretir; hazırlıklı olmak içimi rahatlatır.", "Olası bir sorun belirdiğinde yoluna gireceğini varsayarım; olduğu gibi bırakmak içimi rahatlatır.", "When a possible problem shows up, my mind runs scenarios. Being prepared calms me.", "When a possible problem shows up, I assume it'll work out. Leaving it be calms me."),
    // 7 · 8
    P(7, 8, "Bir engelle karşılaşınca etrafından dolaşmanın yolunu ararım.", "Bir engelle karşılaşınca üzerine gider, yıkarım.", "When I hit an obstacle, I find a way around it.", "When I hit an obstacle, I go through it."),
    P(7, 8, "Beni asıl mutlu eden, seçeneklerin ve özgürlüğün bol olması.", "Beni asıl mutlu eden, kontrolün ve gücün bende olması.", "What really makes me happy is plenty of options and freedom.", "What really makes me happy is having control and power."),
    // 7 · 9
    P(7, 9, "Hayatın temposu yüksek olsun isterim; durgunluk beni sıkar.", "Hayatın temposu sakin olsun isterim; fazla uyarı beni yorar.", "I want life at a high tempo. Stillness bores me.", "I want life at a calm tempo. Too much stimulation wears me out."),
    P(7, 9, "Moralim bozulunca hemen yeni heyecanlar ararım.", "Moralim bozulunca sessizce geri çekilir, sakinleşirim.", "When I'm down, I go looking for new excitement right away.", "When I'm down, I quietly retreat and settle myself."),
    P(7, 9, "Kötü hissetmemek için hayatımı yeni planlar ve heyecanlı seçeneklerle doldururum.", "Kötü hissetmemek için rahat rutinlere yerleşir, ortalığı sakin tutarım.", "To keep from feeling bad, I fill my life with new plans and exciting options.", "To keep from feeling bad, I settle into comfortable routines and keep things calm."),
    // 8 · 9
    P(8, 9, "Çatışmanın üzerine giderim; gerekirse ben başlatırım.", "Çatışmadan kaçınırım; ancak çok zorlanırsam karşı koyarım.", "I go at conflict head-on. If needed, I'll start it.", "I avoid conflict. I only push back if I'm really pushed."),
    P(8, 9, "Bir grupta kontrolü doğal olarak ben alırım.", "Bir grupta kontrolü başkasına bırakmak bana daha rahat gelir.", "In a group, I naturally take control.", "In a group, I'm more comfortable letting someone else take control."),
];
