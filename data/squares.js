// Leela board — 72 fields.
// Sanskrit + English names sourced from leela.eu/en/meanings-of-fields.
// Descriptions adapted from the Harish Johari canonical Leela tradition.
// Arrows (virtues that elevate) and snakes (vices that descend) follow the
// classical board pictured in the user's reference photo.

window.LEELA_SQUARES = [
  { n: 1, sanskrit: "Janma", english: "Birth",
    desc: "The plane of birth, where every game begins and every soul takes its first form. Janma is one of the most fundamental concepts in Vedic philosophy — it signifies birth not only in the physical sense but in the spiritual one, the entry of consciousness into a new arc of experience.\n\nBirth is inseparable from karma: the soul arrives carrying the consequences of all prior action, and the texture of this life is shaped by what was set in motion before it. To land here is to remember that you are at a beginning, however far along the path you appear to be. The work of the field is acceptance — accepting the form you have taken, the family you arrived through, the circumstances that surround you.\n\nFrom this square the long climb back to source begins." },

  { n: 2, sanskrit: "Maya", english: "Illusion",
    desc: "Maya is the veil that makes the temporary appear permanent and the real appear unreachable. It is the great deception of the senses — the conviction that the world perceived through eye and ear and skin is the final reality, when it is only its surface.\n\nTo land on Maya is to be reminded how easily one is taken in. The player who recognises maya does not have to escape the world; they only have to stop confusing it for something it is not. This recognition is the first liberating act on the board, and it must be performed again and again, at every level of the climb.\n\nWhat in your question is you mistaking the temporary for the lasting?" },

  { n: 3, sanskrit: "Krodha", english: "Anger",
    desc: "Krodha is wrath — the heat that destroys discernment. Of the three great inner enemies in Vedic philosophy (alongside pride and lust), anger is the most volatile, because it acts before reflection arrives.\n\nAnger burns its host before it touches anyone else. It exhausts the body, clouds judgement, and forecloses possibilities the calm mind would have seen. Landing here is not a punishment; it is a mirror. The field asks: what unmet need, what unspoken grief, what humiliation is rising as heat?\n\nThe practice of this square is to stay with the sensation of anger without acting on it, until the smoke clears and what is underneath becomes visible." },

  { n: 4, sanskrit: "Lobha", english: "Greed",
    desc: "Lobha is the insatiable wanting that no quantity can satisfy. In Sanskrit the word covers the full range — greed for money, for praise, for affection, for spiritual attainment. Anything can become its object.\n\nGreed is treated harshly in the Vedas because it bends action toward the self at the cost of others, and because the one who carries it suffers most of all: there is no rest in lobha, only the next desire arriving before the present one is fulfilled. To land here is to be shown the shape of one's hunger — and to ask whether the hunger is for the thing itself, or for what one believes the thing will resolve.\n\nThe antidote is dana, charity — practised on the field of square 20." },

  { n: 5, sanskrit: "Bhu-loka", english: "Physical Plane",
    desc: "The earth plane — the world of body, family, food, shelter, work, survival. Bhu-loka is the first of seven lokas (planes of existence) on the board, and it is the foundation from which every subtler plane is reached.\n\nThere is nothing low about this square. The body is the instrument; without it, no journey is undertaken. Material life is not in opposition to spiritual life — it is the soil. The player here is asked to attend to the basics, to honour the body and the small material requirements of being human, and to refuse the spiritual bypass that pretends these things do not matter.\n\nA strong root permits a tall tree." },

  { n: 6, sanskrit: "Moha", english: "Delusion",
    desc: "Moha is attachment that has clouded clear seeing — the binding affection for forms, identities, and outcomes that quietly turns love into bondage. It is the gate of the game: every player passes through moha on their way in.\n\nUnlike maya, which is a general veil, moha is specific and personal. It is your delusion: the relationship you cannot see clearly, the role you mistake for your self, the version of the future you cannot release. The field does not ask you to abandon what you love; it asks you to love it without confusing it for the source of your peace.\n\nClarity arrives slowly here, and only by sitting with what one would rather not look at." },

  { n: 7, sanskrit: "Mada", english: "Vanity",
    desc: "Mada is pride — in body, in knowledge, in lineage, in status, even in spiritual progress. It inflates the small self at the expense of the deeper one and turns achievement into ammunition.\n\nThe Vedic tradition warns against mada more than almost any other quality, because pride is invisible to its host. The proud person cannot see their pride; they only see, from inside it, the reasons their pride is warranted. Landing here is an invitation to take inventory: what is being defended? What would be lost if it were set down?\n\nThe medicine is reverence — for what one does not yet understand, and for the people whose path is not one's own." },

  { n: 8, sanskrit: "Matsara", english: "Envy",
    desc: "Matsara is the small wound that refuses to heal — the sourness that arises at another's good fortune. It is the inverse of joy: where the joyful person is enlarged by another's flourishing, the envious person is diminished by it.\n\nLanding here is uncomfortable, because envy is the feeling least permitted in polite society. The field gives permission to look at it. What does the comparison reveal about what is wanted? Often, envy is information — a quiet signal pointing at a longing one has not consciously claimed.\n\nThe practice is to thank the envied person, silently, for showing what you did not yet know you cared about." },

  { n: 9, sanskrit: "Kama-loka", english: "Plane of Sensuality",
    desc: "Kama is desire, and Kama-loka is the realm in which desire becomes the climate. Sensory pleasure, romance, taste, touch — this is the plane where the body's wanting is most loudly present.\n\nThe Vedas do not condemn kama; desire is one of the four legitimate aims of life. But Kama-loka is a plane, not a destination. The soul that mistakes it for the end gets trapped in its endless cycling: each pleasure satisfies briefly, then must be replaced. The player who comes to know this plane and pass through it intact has done real work.\n\nWhat in your question is asking for pleasure, and what is asking for something pleasure cannot provide?" },

  { n: 10, sanskrit: "Tapa", english: "Purification",
    desc: "Tapa is inner heat — the disciplined fire that burns away impurity. It is voluntary austerity: fasting, silence, single-pointed attention, the deliberate forgoing of comfort for the sake of refinement.\n\nThis field carries the first great arrow on the board. From tapa, the player rises directly to Swarga-loka (heaven). The teaching is clear: discipline earns ascent. Not effort alone, but disciplined effort — the willingness to do less of what one wants in order to become capable of more than one is.\n\nWhat is one small austerity your question is asking you to undertake?" },

  { n: 11, sanskrit: "Gandharva", english: "Plane of Entertainment",
    desc: "The realm of the celestial musicians — beauty, art, performance, the refined pleasures of the cultured life. Gandharvas in the old texts are sky-beings who sing and play, whose presence enchants gods and mortals alike.\n\nThis is a worthy field for the soul that has known purification. Art enlarges life. But for the soul that has not yet done the inner work, gandharva is a sweet trap: beauty consumed as entertainment is a sophisticated form of forgetting. The player here must ask whether they are participating in beauty or escaping into it.\n\nGood art changes the one who receives it. Mere entertainment leaves them as they were." },

  { n: 12, sanskrit: "Irasya", english: "Jealousy",
    desc: "The first serpent on the board. Irasya is jealousy — the active form of envy, the comparing mind weaponised. Where envy is internal sourness, jealousy reaches outward: it criticises, undermines, takes quiet pleasure in another's misfortune.\n\nLanding here drops the player back to matsara (envy at field 8). The slide is steep because jealousy compounds: the more you act on it, the more it grows. The traditional teaching is severe — by refusing to accept the jealousy as one's own, by projecting it outward as the other's fault, one becomes its servant.\n\nThe way out is direct honesty: yes, I am jealous. The naming is half the work." },

  { n: 13, sanskrit: "Antariksha", english: "Plane of the Void",
    desc: "The space between things. Antariksha is the in-between — the field of pure potential where nothing yet is, and so anything may yet be. For the clear soul, it is openness. For the fearful soul, it is worthlessness, the dread of empty rooms.\n\nThe field is morally neutral; how it is experienced depends on what the player brings to it. The contemplative tradition treats the void with great care, because it is here that real change becomes possible — but only if the player can sit in the unstructured moment without rushing to fill it.\n\nWhat would happen if you did not have to know yet?" },

  { n: 14, sanskrit: "Bhuvar-loka", english: "Astral Plane",
    desc: "The second loka — the plane of connection, relationship, energetic exchange. Bhuvar-loka governs how souls touch each other: family, partnership, community, the silent currents that pass between two people in a room.\n\nThis is the plane on which the player learns that energy is real. Some relationships nourish; some deplete. Some exchanges leave the participants enlarged; others leave a residue that takes hours or days to clear. The field asks for honest accounting: where does your energy go, and what returns?\n\nNo soul rises alone. Companionship is one of the great instruments of the climb." },

  { n: 15, sanskrit: "Naga-loka", english: "Plane of Fantasy",
    desc: "The serpent-realm of dreams, imagination, and inner mythology. The nagas in Indian myth are wise but ambiguous — keepers of treasure and threshold, neither benevolent nor malevolent.\n\nFantasy is both a door and a trap. Imagination is how the soul tries on possibilities, how creative life begins, how myth speaks to the deep mind. But the player who refuses to leave the fantasy world never wakes into the actual one. The work is to use imagination without being colonised by it — to visit naga-loka and return.\n\nWhat fantasy in your life is doing real work, and what fantasy is keeping you from your life?" },

  { n: 16, sanskrit: "Dvesha", english: "Rejection",
    desc: "The mirror of attachment — pushing away. Dvesha is aversion, hatred, the refusal to admit something into one's experience. Where raga (attachment) clings, dvesha pushes; both are forms of the same fundamental movement, both fix the soul to what it has taken a position about.\n\nA serpent: from here the player slides back to lobha (greed). The teaching is that aversion is its own kind of greed — the greed for things to not be the way they are. Wanting things to be different is a heavy weight to carry.\n\nThe practice is allowing: this is here, even though I do not want it to be." },

  { n: 17, sanskrit: "Daya", english: "Compassion",
    desc: "Empathy without condition. Daya is not pity — pity preserves the gap between giver and receiver — but compassion, in which one feels another's suffering as one's own without losing oneself in it.\n\nFrom this field rises the longest arrow on the board, straight to Brahma-loka (the plane of the Absolute). Compassion is the swiftest spiritual vehicle. The teaching is precise: not analysis, not even love in the romantic sense, but the simple capacity to feel-with is what carries the soul most directly home.\n\nWhose suffering, if you let it fully in, would change you?" },

  { n: 18, sanskrit: "Harsha-loka", english: "Plane of Joy",
    desc: "Genuine joy — not pleasure, not relief, but the upwelling that comes from contact with the real. Harsha is the spontaneous delight that arises when one is in right relationship with life.\n\nThis is a reward and a way-station. The player here is permitted to rest in gladness without guilt. But harsha is not the goal; it is the by-product of the goal. The mistake would be to grasp at it, to try to manufacture or sustain the feeling. Joy that is grasped at becomes a kind of suffering.\n\nThe practice is to let joy pass through, leaving its trace, and to keep walking." },

  { n: 19, sanskrit: "Karma-loka", english: "Plane of Karma",
    desc: "The plane where action and consequence become visible. Karma in the Vedic sense is not punishment but pattern: every action sets something in motion, and what is set in motion eventually returns to its origin.\n\nOn this field the player becomes accountable. What was done in the dark begins to surface; what was sown is harvested. The pace can be uncomfortable, because karma-loka does not negotiate. But it is also the plane of cleansing: once consequence is met, it is finished.\n\nWhat past action is still asking to be answered for? Begin there." },

  { n: 20, sanskrit: "Dana", english: "Charity",
    desc: "Giving without expectation. Dana is one of the cardinal virtues of the Vedic householder — the practice of releasing what one holds, not for credit, not for return, but as an opening of the hand.\n\nThe arrow from this square lifts the player to Mahar-loka, the plane of balance. The teaching: real generosity rebalances the giver. To give freely is to demonstrate, in one's own body, that there is enough — and that demonstration changes the climate of the giver's life more than any of the receivers'.\n\nWhat in your life are you currently hoarding that wants to be passed along?" },

  { n: 21, sanskrit: "Saman-paap", english: "Atonement",
    desc: "The correction of past wrongs. Saman-paap is not guilt — guilt is paralysis — but active repair: facing what one has done, naming it, and offering whatever amends are still available.\n\nThis is a serious field. The player who passes through it walks lighter, because the energy that was bound up in concealment is freed. The work is not endless self-flagellation but precise reckoning: this is what I did, this is whom it touched, this is what is mine to repair.\n\nThe Vedic understanding is that atonement need not be perfect to be effective; it need only be honest." },

  { n: 22, sanskrit: "Dharma", english: "Living in Harmony",
    desc: "Right action — alignment with one's own nature and with the natural law. Dharma is not external rule-following; it is the discovery, through patient attention, of what is one's own to do in this particular life.\n\nThe arrow from here rises to Su-budhi (positive intellect). The teaching is that right action sharpens right thinking: dharma is not first understood and then performed, but performed and then understood. The player who walks their dharma comes to see clearly, because clarity is dharma's own light.\n\nWhat is yours to do — not what would be admirable, but what is yours?" },

  { n: 23, sanskrit: "Swarga-loka", english: "Heavenly Plane",
    desc: "The classical heaven — confidence, success, pleasure earned through merit. The destination of the great purification-arrow from field 10. Beautiful, sun-filled, deserved.\n\nBut swarga is not the goal of the game. In the Vedic cosmology, even the gods in heaven eventually fall back into the cycle, because heaven is still a place — and any place is something one can be moved from. The soul that lingers too long in earned happiness, mistaking it for arrival, will eventually be returned to the lower fields by the simple gravity of the world.\n\nEnjoy the field. Do not move in." },

  { n: 24, sanskrit: "Ku-sang-loka", english: "Bad Company",
    desc: "The plane of corrupting association. Ku-sang is the company of those whose values pull the player away from their dharma — not necessarily bad people, but people whose orientation is incompatible with one's own work.\n\nA serpent: the company you keep can collapse years of inner cultivation in months. The teaching here is not moralistic; it is pragmatic. The soul is more porous than it knows. Spending sustained time among people who do not value what you value will, slowly, erode your valuing of it.\n\nThe question is not who is good and who is bad — it is whose presence makes it harder to be who you are becoming." },

  { n: 25, sanskrit: "Su-sang-loka", english: "Good Company",
    desc: "Satsang — the company of seekers, of teachers, of the wise. To sit among those who are oriented toward what is real is to be reminded; to be reminded is to return.\n\nThe traditional teaching is that satsang is the single most reliable spiritual influence available to the householder. No discipline matches it for ease. Simply being in the field of those further along the path tunes the player's own field without effort. The work is to seek out su-sang and to refuse the polite resistance one feels to actually showing up.\n\nWho, in your life, makes you want to be more honest?" },

  { n: 26, sanskrit: "Dukha", english: "Sorrow",
    desc: "Suffering as teacher. Dukha is not the same as pain — pain is sensation; dukha is the suffering that comes from resisting what is. It is the universal condition the Buddha named, and the Vedic tradition shares the diagnosis.\n\nDukha is not a punishment, and it is not random. It is the field where the soul meets what was avoided. Met honestly, sorrow does its work and dissolves. Refused, it becomes chronic.\n\nThe practice of this square is to stop trying to fix the sorrow and instead to ask it what it has come to show. Sorrow is patient. It will wait until it is properly received." },

  { n: 27, sanskrit: "Param-artha", english: "Selfless Service",
    desc: "Service without trace of self. Param-artha is the rare action that is genuinely about its recipient, not the giver — no audience required, no record kept, no story told afterwards.\n\nThe arrow from this field rises to Jana-loka, the plane of realisation. The teaching is severe in its beauty: only the unconcerned ascend by this route. The moment the service becomes a performance, the arrow is no longer available.\n\nWhat could you do for someone this week that no one, including them, would ever know about?" },

  { n: 28, sanskrit: "Su-dharma", english: "True Religiosity",
    desc: "Inner faith — devotion that needs no audience and no proof. Su-dharma is the quiet form of religiosity, the kind that survives the loss of certainty.\n\nThe arrow from here lifts to Tapa-loka, the plane of asceticism. The connection is precise: true faith is rewarded with the freedom to renounce, because the one with deep inner orientation no longer needs the props of religious life. The forms are still honoured, but they are not mistaken for the thing they point at.\n\nWhere does your faith hold up when no one is watching?" },

  { n: 29, sanskrit: "A-dharma", english: "Immorality",
    desc: "Action against one's nature and against the natural law. A-dharma is not breaking external rules; it is acting against what one knows, internally, to be one's own truth.\n\nA serpent: from here the player falls quickly into Moha (delusion). The mechanism is honest — once you have acted against your own knowing, you must construct a story to justify the action, and the story is its own delusion. The lie compounds.\n\nThe way back is admission. Not to anyone else necessarily — just to oneself, plainly: that was not mine to do." },

  { n: 30, sanskrit: "Uttama-gati", english: "Good Tendencies",
    desc: "Inherited and cultivated patterns that incline the soul upward. Uttama-gati is the accumulated benefit of past right action — your samskaras, the grooves of habit that now carry you in the direction of your better self.\n\nThis field is a small but stabilising rest stop. What the player earned in earlier rolls now does some of the work for them. The teaching is encouraging: the spiritual life is not all uphill effort. Past disciplines bear fruit later, often invisibly, and the soul that has practised is held by its practice.\n\nWhat habit, currently small, is silently shaping you?" },

  { n: 31, sanskrit: "Yaksha-loka", english: "Meeting the Teacher",
    desc: "The plane of the guardian — a chance encounter that changes the trajectory. Yakshas in the old texts are protective spirits, often appearing in the form of a stranger or animal at a turning point.\n\nThe teacher does not always look like a teacher. Sometimes it is a person; sometimes a book that falls open at the right line; sometimes an illness that imposes the contemplation one would not have chosen. To land here is to be reminded that real instruction is not always sought — it is recognised.\n\nWhat has appeared in your life recently that you have not yet thanked for appearing?" },

  { n: 32, sanskrit: "Mahar-loka", english: "Plane of Balance",
    desc: "The heart-centre of the board. Equilibrium between giving and receiving, action and stillness, inward and outward. The destination of the great charity-arrow from field 20.\n\nMahar-loka is not the absence of motion; it is the field in which motion has found its rhythm. The soul here is no longer thrown by every passing condition. Praise and blame, gain and loss, pleasure and pain — they continue, but they pass through without altering the basic ground.\n\nThe practice is not to seek balance but to notice when one has it, and to recognise what makes it possible." },

  { n: 33, sanskrit: "Gandha-loka", english: "Plane of Scents",
    desc: "Subtle sensation refined. Gandha-loka is the world perceived through fragrance — the most ancient and least conceptual of the senses, the one that arrives before thought.\n\nThis is a transitional plane. The player's senses begin to thin, to refine, to register what was always present but unnoticed. Incense, the air after rain, the trace of someone who has left the room. The teaching here is attention: what becomes visible when the gross is set aside?\n\nWhat in your life are you smelling that you have not yet named?" },

  { n: 34, sanskrit: "Rasa-loka", english: "Plane of Tastes",
    desc: "Aesthetic experience as spiritual nourishment — or as final attachment. Rasa in Indian aesthetics means flavour, but more than that: the essence one tastes when one is rightly present to something beautiful.\n\nThis is a refined field. Art, music, food, language all become subtler here. But the same trap that lurked in Gandharva (field 11) lurks here: rasa can be a path or a destination. The soul that pursues taste for its own sake becomes a connoisseur of surfaces.\n\nGood taste, used rightly, is a form of attention. Used wrongly, it is a form of pride." },

  { n: 35, sanskrit: "Naraka-loka", english: "Purgatory",
    desc: "The plane of consequence — the realm where past harms are met in full. Naraka is the Vedic equivalent of hell, but it is not eternal; it is a phase of accounting.\n\nA serpent: from here the player falls quickly to Krodha (anger), because the natural response to meeting one's own consequences is rage — at oneself, at the world, at the apparent unfairness of having to face what one set in motion.\n\nThe practice, if practice is possible here, is endurance. Naraka passes. What one was avoiding is finally met, and once it is met, one is freed of it." },

  { n: 36, sanskrit: "Swatccha", english: "Clarity",
    desc: "Transparency of consciousness — the mind that no longer distorts. Swatccha is the quality of clear water: nothing added, nothing missing, the bottom visible.\n\nFrom this field the player can be seen, and can finally see. The veils that operated unconsciously are recognised, named, and partially set aside. This is not enlightenment; it is the condition that makes deeper work possible.\n\nThe practice that brings one here is patient self-honesty over time. Clarity is not had in a moment; it is settled into, the way silt settles in water that has been allowed to rest." },

  { n: 37, sanskrit: "Jnyana", english: "Wisdom",
    desc: "Direct knowing — not learning, but recognition. Jnyana is the kind of understanding that does not depend on information. It is the recognition of what is, the way one recognises a face one has known all along.\n\nThe arrow from here rises to Ananda-loka, the plane of bliss. The connection is exact: wisdom is its own joy. To see clearly is, by nature, to be at peace, because what generated the unrest was misunderstanding.\n\nJnyana cannot be sought directly; it arrives when the noise has thinned enough for it to be heard." },

  { n: 38, sanskrit: "Prana-loka", english: "Plane of Energy",
    desc: "Life-force as a plane in itself. Prana is the subtle current that animates the body — more refined than blood, less abstract than mind. The yogic traditions describe it in detail; most of us never notice it.\n\nOn this field the player begins to work with energy as something distinct from body or thought. Breath becomes interesting. The state of one's vitality becomes a daily reading. The teaching is that prana is not a metaphor; it is a real, perceptible substance, and managing it well changes everything downstream.\n\nWhere is your energy today, and where did it go yesterday?" },

  { n: 39, sanskrit: "Apana-loka", english: "Releasing",
    desc: "The downward current — letting go, eliminating, surrendering what is finished. Apana is one of the five vayus (vital currents) in yoga, the one that handles release.\n\nThis is a subtle and essential field. Without good apana, the system clogs: held breath, held grief, held resentment, held food. The practice is opening the channels of departure. What can leave? What is asking to be released?\n\nNot everything must be processed; some things only need to be let go." },

  { n: 40, sanskrit: "Vyana-loka", english: "Restoring Integrity",
    desc: "The current that pervades and integrates. After apana's release, vyana gathers what remains and restores wholeness. It is the harmonising vayu — the one that ensures the body, the energy field, and the psyche are all in communication.\n\nThis field rebuilds. After loss, after letting go, after the surgery of releasing, vyana stitches the fabric back together. The teaching is that integration takes time and must not be rushed. Wholeness re-emerges; it cannot be installed.\n\nWhere in your life is something currently being rewoven? Honour the slowness." },

  { n: 41, sanskrit: "Jana-loka", english: "Plane of Realisation",
    desc: "The human plane of attainment — where the soul touches its own depth and recognises it. Jana-loka is the destination of the selfless-service arrow from field 27 and one of the great fields on the board.\n\nRealisation here is not enlightenment in its final form, but a real, lived recognition: I am not what I have been taking myself to be. The recognition does not have to be sustained continuously; it only has to have happened once, irreversibly. From this field, the rest of the journey changes character.\n\nWhat have you already realised, briefly, that you have not yet allowed to change you?" },

  { n: 42, sanskrit: "Agni-loka", english: "Plane of Fire",
    desc: "The transforming fire. Agni is the oldest of the Vedic deities, the fire that carries the offering and converts substance into essence. Agni-loka is the plane on which the player meets this fire as their own.\n\nWhat burns also clarifies. The heat encountered here is uncomfortable in the way that any real transformation is uncomfortable — old structures are consumed; what survives the fire is what is true.\n\nThe practice is not to extinguish the fire but to feed it consciously: this is what I offer, knowing it will not return in its current form." },

  { n: 43, sanskrit: "Manushya-janma", english: "Birth of a Conscious Human",
    desc: "Rebirth — but now as a being who knows what they are. The first birth, at field 1, was involuntary. This second birth is earned. The soul that reaches manushya-janma has finally become a fully human being in the deeper sense: conscious of itself, of its capacities, of its place in the larger arc.\n\nFrom this field forward, the rest of the journey is voluntary. The pull of unconsciousness weakens. The player begins to act in alignment rather than reaction.\n\nThis is a quiet milestone. There is no celebration in the Vedic literature, only a deepening." },

  { n: 44, sanskrit: "A-vidya", english: "Ignorance",
    desc: "Not absence of information — absence of recognition. A-vidya is the forgetting of what one had already learned, the slipping back into the old way of seeing as if the new seeing had never happened.\n\nA serpent: from here the player falls all the way back to Kama-loka (field 9), the plane of sensuality. The mechanism is unforgiving — forgetting one's depth, the soul defaults to its surface desires, and the climb must be repeated.\n\nForgetting is normal. The practice is to notice when one has forgotten, and to come back without self-recrimination. The forgetting itself is not the problem; the failure to notice is." },

  { n: 45, sanskrit: "Su-vidya", english: "Correct Knowledge",
    desc: "Knowledge aligned with the real. Su-vidya is the right counterpart to a-vidya: not more information, but information rightly understood — understanding that points at what is true rather than what is comforting.\n\nThe arrow from here is one of the great ones, carrying the player to Rudra-loka (the plane of cosmic good). The teaching: real knowledge is dangerous to the false self, and so it transforms whoever genuinely holds it.\n\nDistinguish carefully: not everything that calls itself knowledge serves the soul. Su-vidya is the kind that costs something to accept." },

  { n: 46, sanskrit: "Viveka", english: "Discernment",
    desc: "The capacity to distinguish the real from the unreal in any given moment. Viveka is the practical instrument of the spiritual life — the moment-to-moment ability to see which voice in the mind is true and which is false.\n\nThe arrow from this field lifts the player to Sukha (happiness). The connection is direct: happiness is not the absence of difficulty but the presence of clear seeing, because clear seeing dissolves most of what produces suffering.\n\nViveka cannot be taught in the abstract; it is practised in the concrete moments of one's life, again and again, until it becomes one's natural way of perceiving." },

  { n: 47, sanskrit: "Sarasvati", english: "Sushumna",
    desc: "The central channel of the subtle body. Sarasvati in this context refers not to the goddess but to the nadi — the vertical current that runs along the spine, the axis of consciousness.\n\nTo move through this field is to be aligned along the axis of return. When prana flows in sushumna, ordinary consciousness loosens and what is underneath becomes accessible. This is a transit point. The player is not yet at the destination, but the route is now clear.\n\nThe practice is uprightness — physical, energetic, psychological. The spine remembers what the mind forgets." },

  { n: 48, sanskrit: "Yamuna", english: "Pingala",
    desc: "The solar channel — active, outgoing, the masculine current. Pingala is the right-side nadi, associated with the sun, with action, with the externally directed mind.\n\nThis is one half of the breath. When pingala dominates, one is energetic, productive, perhaps restless. Neither good nor bad — necessary fuel for life in the world, but exhausting when it runs alone.\n\nThe player here is asked to feel the heat of pingala consciously, to use it without being run by it, and to know when it is time to switch to its lunar counterpart." },

  { n: 49, sanskrit: "Ganga", english: "Ida",
    desc: "The lunar channel — receptive, cool, the feminine current. Ida is the left-side nadi, associated with the moon, with intuition, with the inwardly turned mind.\n\nWith pingala, ida forms the breath. The healthy life alternates between them, and the spiritual life learns to balance them until they harmonise in sushumna. To land here is to be reminded of the receptive mode — the value of slowness, of intuition, of the quiet way of knowing that does not announce itself.\n\nWhat is your life currently asking you to receive that you have been trying to produce?" },

  { n: 50, sanskrit: "Tapa-loka", english: "Plane of Asceticism",
    desc: "The plane of voluntary austerity. Tapa-loka is the higher counterpart of the discipline-arrow's origin at field 10: the same fire, now at a refined register.\n\nRenunciation here is not deprivation; it is power. The player who has learned to want little can contain much. The teaching is counter-intuitive in a consumption culture: less, freely chosen, produces more freedom than more, anxiously accumulated.\n\nWhat could you give up this week that no one would ask you to give up?" },

  { n: 51, sanskrit: "Prithvi", english: "Earth",
    desc: "The earth element returning at a subtler register. Prithvi at the lower fields was simple ground — body, survival, the basics. Prithvi here is something different: solidity reborn, the ground recognised as sacred.\n\nThe player who once needed earth for survival now offers it back as ground. Embodiment becomes a practice. The body is no longer the thing to escape on the way to spirit; it is itself the spirit's instrument, deserving of attention and care.\n\nWhat does it mean to be at home in your body, knowing it is temporary?" },

  { n: 52, sanskrit: "Himsa-loka", english: "Plane of Violence",
    desc: "Harm to others, harm to self, harm by neglect. Himsa is the inverse of ahimsa, the cardinal yogic ethic of non-harming. It includes the dramatic forms but also the small ones: the cutting remark, the withheld kindness, the indifference to suffering one could have prevented.\n\nA serpent: from here the player falls to Naraka-loka (field 35), the realm of consequence. The fall is logical — violence sets karma in motion, and the karma must be met.\n\nThe practice is to notice the small violences of an ordinary day and to choose, more often, the non-harming alternative." },

  { n: 53, sanskrit: "Jala-loka", english: "Plane of Water",
    desc: "The element of flow, emotion, and dissolution. Water teaches what earth cannot: how to take any shape, how to find the lowest path, how to wear down what is hardest by simple persistence.\n\nThe player here is asked to work with emotion as water — to let it flow rather than block it, to honour its movement without being swept away. Emotions are not the truth; they are weather. But the weather is real, and the soul that pretends it is not gets weathered worst of all.\n\nWhich emotion in you is currently dammed, and what would it be like to let it pass through?" },

  { n: 54, sanskrit: "Bhakti-loka", english: "Plane of Devotion",
    desc: "Love directed at the source. Bhakti is the path of the heart — devotion to the divine, not as a concept but as a beloved.\n\nFrom this field rises the shortest of the great arrows: directly to field 68, Cosmic Consciousness. The teaching is among the most radical on the board — devotion outruns method. The bhakta does not need to understand; they only need to love. And love, given completely, accomplishes what years of disciplined practice strain to approach.\n\nWhat in your life have you loved without reserve? That is your way home." },

  { n: 55, sanskrit: "Ahamkara", english: "Selfishness",
    desc: "The I-maker. Ahamkara is the function of the mind that produces the sense of being a separate self — the voice that says mine, me, separate. In small doses it is necessary; in excess it becomes the central obstacle.\n\nA long serpent: from here the player falls back to Krodha (anger). The mechanism is exact — the ego-self, threatened, defends itself with rage, and the climb of many fields is undone in a single fall.\n\nAhamkara cannot be eliminated by attack; that only strengthens it. It thins through patient inattention, through the slow refusal to fortify it with stories of grievance and pride." },

  { n: 56, sanskrit: "Omkara", english: "Primal Sound",
    desc: "The plane of the original vibration. OM, the syllable that contains all sounds, the vibration from which the manifest world is said to arise.\n\nThe player here begins to hear what was always playing. Sound becomes a primary mode of access — chant, music, the cadence of breath. The teaching is that the world is not silent and reality is not abstract; the substrate of existence is vibratory, and the attentive ear can register it.\n\nWhat is the sound underneath your current life? What hums when nothing else is happening?" },

  { n: 57, sanskrit: "Vayu-loka", english: "Plane of Air",
    desc: "The element of breath, movement, and subtle pervasion. After Omkara's sound, vayu's air: still subtler, still closer to source.\n\nAir is the most intimate element; it enters and leaves the body thousands of times a day without being noticed. The player here is asked to notice. Breath is not a metaphor for life; it is life's most immediate signature. To attend to it is to attend to the soul's edge.\n\nThe practice is simple and endless: one conscious breath, again, again, again." },

  { n: 58, sanskrit: "Teja-loka", english: "Plane of Radiance",
    desc: "Expansion of consciousness — light not as metaphor but as condition. Teja is the radiance that comes from contact with the real; the player here begins to glow with what they have understood.\n\nThis is not a performance. The radiance is not visible the way a lamp is visible; it is felt by those around the person, as a quality of presence. It is the by-product of the inner work, never its goal. Pursued directly, it becomes a kind of vanity (see field 7) and falls back.\n\nThe practice is to not be impressed with one's own light. Stay ordinary." },

  { n: 59, sanskrit: "Satya-loka", english: "Plane of Reality",
    desc: "Truth as a plane — the field where things are what they are. Untouchable by maya, by self-deception, by collective consensus. Satya is the irreducible.\n\nFew players reach satya-loka without help. It is the seventh and highest of the standard lokas, the threshold before the absolute. To stand here is to know directly what cannot be said.\n\nThe practice that brings one here is the long discipline of truthfulness — beginning with truthfulness to oneself, the kind that even the spiritual life often quietly evades. Satya is the cumulative effect of refusing, day after day, to lie to oneself about what is actually so." },

  { n: 60, sanskrit: "Su-budhi", english: "Positive Intellect",
    desc: "Discerning intellect aligned with dharma. Su-budhi is the destination of the dharma-arrow from field 22 — the mind put into the service of the real.\n\nIntellect by itself is morally neutral; it can serve any master. Su-budhi is intellect that has been claimed by right purpose. The thinking is sharp, but the sharpness cuts away delusion rather than enemies.\n\nThe player here uses the mind to clarify, not to win. Reasoning becomes an instrument of devotion: I think, in order to see; I see, in order to act rightly." },

  { n: 61, sanskrit: "Dur-budhi", english: "Negative Intellect",
    desc: "Cleverness without alignment. Dur-budhi is intellect used to justify what one already wants to do — the lawyer's mind, the rationalising mind, the part of consciousness that constructs sophisticated arguments for unsophisticated impulses.\n\nA serpent: from here the player falls back to Antariksha (field 13), the void of worthlessness. The fall makes sense — when the intellect has been corrupted, the soul loses its bearings, and the resulting emptiness is no longer pregnant but bleak.\n\nThe practice is suspicion of one's own arguments. The cleverer the rationalisation, the more carefully it warrants examination." },

  { n: 62, sanskrit: "Sukha", english: "Happiness",
    desc: "Settled contentment. Not pleasure, which depends on conditions; sukha is the steady happiness that does not require things to be a particular way.\n\nThis is the destination of the discernment-arrow from field 46. The connection is precise: when one sees clearly, much of what generated unhappiness is revealed as misunderstanding, and the absence of that unhappiness is sukha.\n\nThe player who has known sukha briefly knows what is possible. The practice is to remember it when conditions worsen, and to recognise that the worsening conditions are not the obstacle to it that they appear to be." },

  { n: 63, sanskrit: "Tamas", english: "Inertia",
    desc: "Heaviness, dullness, stuckness. Tamas is one of the three gunas (qualities of nature) — the one that pulls down, that resists movement, that prefers sleep to attention.\n\nA long serpent: from here the player falls almost all the way back to Maya (field 2). The danger of tamas is not falling but forgetting. The tamasic state does not protest its situation; it accepts it, settles into it, accommodates to its diminishment.\n\nThe way out is small, sustained motion. Not heroic effort — heroic effort cannot be sustained — but the modest daily refusal to stay where one has stopped." },

  { n: 64, sanskrit: "Prakriti-loka", english: "Connection with the Earth",
    desc: "The plane of nature recognised as divine. Prakriti in Sankhya philosophy is primordial matter, the feminine principle from which all manifestation arises. To land here is to meet matter not as obstacle to spirit but as spirit's own body.\n\nThe player returns to earth, but seeing it differently. Every leaf, every stone, every passing animal is recognised as participating in the same reality that the highest meditation glimpses.\n\nThe practice is reverence for the ordinary. The cosmos is not elsewhere; it is here, in this room, in this body, now." },

  { n: 65, sanskrit: "Uranta-loka", english: "Plane of Inner Space",
    desc: "The interior cosmos. Uranta-loka is the recognition that the universe one perceives outward and the universe one experiences inward are not two different things.\n\nFrom this field, outward and inward begin to mean the same thing. The depth of one's interior is the depth of the world. The vastness within is the vastness without. This is not a metaphor for the player here; it is a daily experience.\n\nThe practice is patient attention to the interior. The deeper one looks within, the more one finds the same furniture that is in the world." },

  { n: 66, sanskrit: "Ananda-loka", english: "Plane of Bliss",
    desc: "Bliss not as feeling but as the substance of awareness. Ananda is one of the three irreducible qualities of the absolute in Vedanta (sat-chit-ananda — being, consciousness, bliss). To touch this plane is to recognise that bliss is not earned; it is constitutive.\n\nThis is the destination of the wisdom-arrow from field 37. The player is very close now. Most of the obstacles have been seen through; what remains is the final identification of awareness with its own ground.\n\nThe practice is not striving. Striving belongs to the lower fields. Here, the work is simple recognition." },

  { n: 67, sanskrit: "Rudra-loka", english: "Plane of Cosmic Good",
    desc: "The fierce form of the divine. Rudra is the older name of Shiva — the destroyer, the one who clears away. Cosmic good is not always gentle; sometimes the highest service is to remove what should not continue.\n\nDestination of the right-knowledge arrow from field 45. The teaching is hard and holy: the soul that holds correct knowledge participates in the cosmic work of destruction — the destruction of illusion, of false structures, of attachments that have outlived their purpose.\n\nThe practice is willingness. To be near Rudra is to consent to be unmade and remade." },

  { n: 68, sanskrit: "Vaikuntha-loka", english: "Cosmic Consciousness",
    desc: "The goal of the game. Vaikuntha is the realm beyond change, beyond duality, beyond the cycle of birth and death. To land exactly here is to complete the journey the soul began at field 1.\n\nThe roll must be precise; only an exact landing wins. The teaching: realisation cannot be approximated. It is not a place one nearly reaches.\n\nFrom here, the player can choose to be reborn — to roll a six and begin again, this time with the question resolved — or to rest in the achieved state. Most players cannot remain. Cosmic consciousness is the destination, but life in the body continues, and the work begins again at a higher octave.\n\nWelcome home. Read your notes back from the top.", goal: true },

  { n: 69, sanskrit: "Brahma-loka", english: "Plane of the Absolute",
    desc: "Creation itself — the plane of the source viewed as creator. Brahma is the first of the trimurti, the deity who emanates the world.\n\nDestination of the great compassion-arrow from field 17. From here, only the gunas (qualities) remain, and even they are visible as movements within the unmoved. The player is at the highest plane of the manifest world, just below the unmanifest.\n\nThe paradox of Brahma-loka is that it is so close to the goal but cannot reach it by ordinary motion. The exact roll that wins the game is rarely available from this elevation; most players who reach 69 will eventually be drawn through 70, 71, 72 and back down by the final serpent — a humbling, and a return to the work." },

  { n: 70, sanskrit: "Sattva-guna", english: "Energy of Goodness",
    desc: "The quality of purity, light, balance. Sattva is the most refined of the three gunas — the climate of the meditative mind, the still water in which reflection is possible.\n\nAnd still: a quality is still a movement, still something to release. The Vedantic teaching is exact about this. Even sattva binds, because identification with goodness produces its own subtle ego — the pride of being the calm one, the wise one, the one who has transcended.\n\nThe player who lingers in pure sattva must eventually let it pass too. The absolute is beyond all three gunas, even the best of them." },

  { n: 71, sanskrit: "Raja-guna", english: "Energy of Movement",
    desc: "The quality of action, passion, restlessness. Rajas is the climate of doing — necessary, generative, exhausting.\n\nWithout rajas, nothing is built. The whole of culture, of art, of relationship, of livelihood depends on rajasic energy. The danger is not having it; it is being run by it. The rajasic soul cannot stop, cannot tolerate quiet, cannot endure being alone with itself.\n\nThe player here is asked to feel the propulsion consciously. Yes, move. But know that you are moving. The unconscious mover gets thrown by their own momentum." },

  { n: 72, sanskrit: "Tama-guna", english: "Energy of Inertia",
    desc: "The final serpent. Tamas at its highest registration — heaviness, decay, forgetting at the level of cosmic principle.\n\nFrom here, the slide returns the player to Prithvi (field 51), Earth. The teaching is the deepest of the board: even at the elevation of the gunas, falling is possible, and falling all the way back to the ground is built into the structure of the journey.\n\nThis is not failure. Every fall is a chance to climb more truly the second time. The soul that has reached field 72 and been returned to field 51 carries everything it learned on the way up. The descent strips off the accumulated identifications; what remains is what is real.\n\nBegin again, more lightly.", finalSnake: true },
];

// Arrows (virtues — climb upward).
window.LEELA_ARROWS = {
  10: 23, // Purification → Heavenly plane
  17: 69, // Compassion → Plane of the Absolute
  20: 32, // Charity → Plane of balance
  22: 60, // Dharma → Positive intellect
  27: 41, // Selfless service → Plane of realisation
  28: 50, // True faith → Plane of asceticism
  37: 66, // Wisdom → Plane of bliss
  45: 67, // Correct knowledge → Plane of cosmic good
  46: 62, // Discernment → Happiness
  54: 68, // Devotion → Cosmic consciousness (the goal)
};

// Snakes (vices — slide downward).
window.LEELA_SNAKES = {
  12: 8,   // Jealousy → Envy
  16: 4,   // Rejection → Greed
  24: 7,   // Bad company → Vanity
  29: 6,   // Immorality → Delusion
  35: 3,   // Purgatory → Anger
  44: 9,   // Ignorance → Plane of sensuality
  52: 35,  // Violence → Purgatory
  55: 3,   // Selfishness → Anger
  61: 13,  // Negative intellect → Void
  63: 2,   // Inertia → Illusion
  72: 51,  // Tama-guna → Earth
};

// Chakra fields — visually highlighted on the board.
window.LEELA_CHAKRAS = [6, 14, 23, 32, 41, 50, 59, 68];
