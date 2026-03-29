// 设计取向（已选定并贯彻全站）：
// “Storybook Arcade”——童书插画 + 复古游戏机界面。
// 关键词：强对比深色底、霓虹高光、纸张纹理、夸张按钮、得分/连击动效。

import frownImg from "@/assets/words/frown.jpg";
import medievalImg from "@/assets/words/medieval.jpg";
import disguiseImg from "@/assets/words/disguise.jpg";
import cauldronImg from "@/assets/words/cauldron.jpg";
import potionImg from "@/assets/words/potion.jpg";
import creepImg from "@/assets/words/creep.jpg";
import bellowImg from "@/assets/words/bellow.jpg";
import swivelImg from "@/assets/words/swivel.jpg";
import enormousImg from "@/assets/words/enormous.jpg";
import luminousImg from "@/assets/words/luminous.jpg";
import silhouetteImg from "@/assets/words/silhouette.jpg";
import bizarreImg from "@/assets/words/bizarre.jpg";

import blurtImg from "@/assets/words/blurt.jpg";
import smirkImg from "@/assets/words/smirk.jpg";
import bullyImg from "@/assets/words/bully.jpg";
import strideImg from "@/assets/words/stride.jpg";
import winceImg from "@/assets/words/wince.jpg";
import abruptlyImg from "@/assets/words/abruptly.jpg";
import squeezeImg from "@/assets/words/squeeze.jpg";
import chuckleImg from "@/assets/words/chuckle.jpg";
import gapeImg from "@/assets/words/gape.jpg";
import driftImg from "@/assets/words/drift.jpg";
import recklessImg from "@/assets/words/reckless.jpg";
import strandedImg from "@/assets/words/stranded.jpg";

import reproachfulImg from "@/assets/words/reproachful.jpg";
import persuadeImg from "@/assets/words/persuade.jpg";
import ominousImg from "@/assets/words/ominous.jpg";
import gauntImg from "@/assets/words/gaunt.jpg";
import maniacImg from "@/assets/words/maniac.jpg";
import lunaticImg from "@/assets/words/lunatic.jpg";

import insolentImg from "@/assets/words/insolent.jpg";
import wastrelImg from "@/assets/words/wastrel.jpg";
import glazedImg from "@/assets/words/glazed.jpg";
import apoplecticImg from "@/assets/words/apoplectic.jpg";
import wrenchImg from "@/assets/words/wrench.jpg";
import surgeImg from "@/assets/words/surge.jpg";

// Chapters 3–4 (basic)
import reliableImg from "@/assets/words/reliable.jpg";
import stealthilyImg from "@/assets/words/stealthily.jpg";
import convictImg from "@/assets/words/convict.jpg";
import filthyImg from "@/assets/words/filthy.jpg";
import suspiciousImg from "@/assets/words/suspicious.jpg";
import sprintImg from "@/assets/words/sprint.jpg";
import franticImg from "@/assets/words/frantic.jpg";
import restrictionImg from "@/assets/words/restriction.jpg";
import outcastImg from "@/assets/words/outcast.jpg";
import prospectImg from "@/assets/words/prospect.jpg";
import eludeImg from "@/assets/words/elude.jpg";
import expelImg from "@/assets/words/expel.jpg";

import refugeImg from "@/assets/words/refuge.jpg";
import graveImg from "@/assets/words/grave.jpg";
import strainImg from "@/assets/words/strain.jpg";
import lenientImg from "@/assets/words/lenient.jpg";
import strickenImg from "@/assets/words/stricken.jpg";
import remoteImg from "@/assets/words/remote.jpg";
import suspectImg from "@/assets/words/suspect.jpg";
import nettledImg from "@/assets/words/nettled.jpg";
import forebodingImg from "@/assets/words/foreboding.jpg";
import delicateImg from "@/assets/words/delicate.jpg";
import pleadImg from "@/assets/words/plead.jpg";
import terrorImg from "@/assets/words/terror.jpg";

// Chapters 3–4 (challenge)
import protrudingImg from "@/assets/words/protruding.jpg";
import dispatchedImg from "@/assets/words/dispatched.jpg";
import apothecaryImg from "@/assets/words/apothecary.jpg";
import sumptuousImg from "@/assets/words/sumptuous.jpg";
import retortedImg from "@/assets/words/retorted.jpg";
import deafeningImg from "@/assets/words/deafening.jpg";

import knickerbockersImg from "@/assets/words/knickerbockers.jpg";
import elastic2Img from "@/assets/words/elastic.jpg";
import porridgeImg from "@/assets/words/porridge.jpg";
import scruffsImg from "@/assets/words/scruffs.jpg";
import tuftsImg from "@/assets/words/tufts.jpg";
import amblingImg from "@/assets/words/ambling.jpg";

export type VocabWord = {
  id: string;
  word: string;
  pos: string;
  syllables: string;
  meaningEasyEn: string;
  exampleEasyEn: string;
  chapter: 1 | 2 | 3 | 4;
  imageSrc: string;
  difficulty: "basic" | "challenge";
};

export const VOCAB_WORDS: VocabWord[] = [
  {
    id: "ch1_frown",
    word: "frown",
    pos: "v/n",
    syllables: "frown",
    meaningEasyEn: "to make your face look unhappy or angry",
    exampleEasyEn: "He began to frown when he saw the messy room.",
    chapter: 1,
    imageSrc: frownImg,
    difficulty: "basic",
  },
  {
    id: "ch1_medieval",
    word: "medieval",
    pos: "adj",
    syllables: "me-DI-e-val",
    meaningEasyEn: "from a very long time ago (the Middle Ages)",
    exampleEasyEn: "We saw a medieval castle in a picture book.",
    chapter: 1,
    imageSrc: medievalImg,
    difficulty: "basic",
  },
  {
    id: "ch1_disguise",
    word: "disguise",
    pos: "n/v",
    syllables: "dis-GUISE",
    meaningEasyEn: "a way to hide who you are",
    exampleEasyEn: "The hero wore a disguise and no one knew it was him.",
    chapter: 1,
    imageSrc: disguiseImg,
    difficulty: "basic",
  },
  {
    id: "ch1_cauldron",
    word: "cauldron",
    pos: "n",
    syllables: "CAUL-dron",
    meaningEasyEn: "a big pot for cooking or mixing",
    exampleEasyEn: "The soup bubbled in a large cauldron.",
    chapter: 1,
    imageSrc: cauldronImg,
    difficulty: "basic",
  },
  {
    id: "ch1_potion",
    word: "potion",
    pos: "n",
    syllables: "PO-tion",
    meaningEasyEn: "a special drink (sometimes magic)",
    exampleEasyEn: "She mixed a potion with water and herbs.",
    chapter: 1,
    imageSrc: potionImg,
    difficulty: "basic",
  },
  {
    id: "ch1_creep",
    word: "creep",
    pos: "v",
    syllables: "creep",
    meaningEasyEn: "to move very quietly and slowly",
    exampleEasyEn: "The cat tried to creep toward the bird.",
    chapter: 1,
    imageSrc: creepImg,
    difficulty: "basic",
  },
  {
    id: "ch1_bellow",
    word: "bellow",
    pos: "v",
    syllables: "BEL-low",
    meaningEasyEn: "to shout in a very loud voice",
    exampleEasyEn: "The coach bellowed, \"Run faster!\"",
    chapter: 1,
    imageSrc: bellowImg,
    difficulty: "basic",
  },
  {
    id: "ch1_swivel",
    word: "swivel",
    pos: "v",
    syllables: "SWIV-el",
    meaningEasyEn: "to turn quickly to look at something",
    exampleEasyEn: "His head swivelled when he heard a noise.",
    chapter: 1,
    imageSrc: swivelImg,
    difficulty: "basic",
  },
  {
    id: "ch1_enormous",
    word: "enormous",
    pos: "adj",
    syllables: "e-NOR-mous",
    meaningEasyEn: "very, very big",
    exampleEasyEn: "An enormous elephant walked past us.",
    chapter: 1,
    imageSrc: enormousImg,
    difficulty: "basic",
  },
  {
    id: "ch1_luminous",
    word: "luminous",
    pos: "adj",
    syllables: "LU-mi-nous",
    meaningEasyEn: "giving off soft light",
    exampleEasyEn: "The luminous clock glowed at night.",
    chapter: 1,
    imageSrc: luminousImg,
    difficulty: "basic",
  },
  {
    id: "ch1_silhouette",
    word: "silhouette",
    pos: "n",
    syllables: "sil-oo-ET",
    meaningEasyEn: "a dark shape you see against light",
    exampleEasyEn: "We saw a bird’s silhouette in the sunset.",
    chapter: 1,
    imageSrc: silhouetteImg,
    difficulty: "basic",
  },
  {
    id: "ch1_bizarre",
    word: "bizarre",
    pos: "adj",
    syllables: "bi-ZAR",
    meaningEasyEn: "very strange or unusual",
    exampleEasyEn: "He wore a bizarre hat with feathers.",
    chapter: 1,
    imageSrc: bizarreImg,
    difficulty: "basic",
  },

  {
    id: "ch2_blurt",
    word: "blurt",
    pos: "v",
    syllables: "blurt",
    meaningEasyEn: "to say something suddenly (without thinking)",
    exampleEasyEn: "He blurted out the answer too quickly.",
    chapter: 2,
    imageSrc: blurtImg,
    difficulty: "basic",
  },
  {
    id: "ch2_smirk",
    word: "smirk",
    pos: "v/n",
    syllables: "smirk",
    meaningEasyEn: "a small smile that is not very kind",
    exampleEasyEn: "He gave a smirk when he won the game.",
    chapter: 2,
    imageSrc: smirkImg,
    difficulty: "basic",
  },
  {
    id: "ch2_bully",
    word: "bully",
    pos: "n/v",
    syllables: "BUL-ly",
    meaningEasyEn: "to be mean and hurt others on purpose",
    exampleEasyEn: "We should never bully anyone in school.",
    chapter: 2,
    imageSrc: bullyImg,
    difficulty: "basic",
  },
  {
    id: "ch2_stride",
    word: "stride",
    pos: "v/n",
    syllables: "stride",
    meaningEasyEn: "to walk with long, confident steps",
    exampleEasyEn: "She strode into class like a leader.",
    chapter: 2,
    imageSrc: strideImg,
    difficulty: "basic",
  },
  {
    id: "ch2_wince",
    word: "wince",
    pos: "v/n",
    syllables: "wince",
    meaningEasyEn: "to make a quick face when something hurts",
    exampleEasyEn: "He winced when the ball hit his knee.",
    chapter: 2,
    imageSrc: winceImg,
    difficulty: "basic",
  },
  {
    id: "ch2_abruptly",
    word: "abruptly",
    pos: "adv",
    syllables: "a-BRUPT-ly",
    meaningEasyEn: "suddenly, with no warning",
    exampleEasyEn: "The rain stopped abruptly.",
    chapter: 2,
    imageSrc: abruptlyImg,
    difficulty: "basic",
  },
  {
    id: "ch2_squeeze",
    word: "squeeze",
    pos: "v/n",
    syllables: "squeeze",
    meaningEasyEn: "to press something hard",
    exampleEasyEn: "He squeezed the sponge to get water out.",
    chapter: 2,
    imageSrc: squeezeImg,
    difficulty: "basic",
  },
  {
    id: "ch2_chuckle",
    word: "chuckle",
    pos: "v/n",
    syllables: "CHUCK-le",
    meaningEasyEn: "to laugh quietly",
    exampleEasyEn: "Dad chuckled at the funny joke.",
    chapter: 2,
    imageSrc: chuckleImg,
    difficulty: "basic",
  },
  {
    id: "ch2_gape",
    word: "gape",
    pos: "v/n",
    syllables: "gape",
    meaningEasyEn: "to stare with your mouth open",
    exampleEasyEn: "We gaped at the huge dinosaur bones.",
    chapter: 2,
    imageSrc: gapeImg,
    difficulty: "basic",
  },
  {
    id: "ch2_drift",
    word: "drift",
    pos: "v/n",
    syllables: "drift",
    meaningEasyEn: "to move slowly (like on water or in air)",
    exampleEasyEn: "The clouds drifted across the sky.",
    chapter: 2,
    imageSrc: driftImg,
    difficulty: "basic",
  },
  {
    id: "ch2_reckless",
    word: "reckless",
    pos: "adj",
    syllables: "RECK-less",
    meaningEasyEn: "not careful; taking dangerous risks",
    exampleEasyEn: "Running into the road is reckless.",
    chapter: 2,
    imageSrc: recklessImg,
    difficulty: "basic",
  },
  {
    id: "ch2_stranded",
    word: "stranded",
    pos: "adj",
    syllables: "STRAND-ed",
    meaningEasyEn: "stuck somewhere with no way to go",
    exampleEasyEn: "The boat was stranded on the sand.",
    chapter: 2,
    imageSrc: strandedImg,
    difficulty: "basic",
  },

  // ---- Chapter 1 Challenge ----
  {
    id: "ch1_reproachful",
    word: "reproachful",
    pos: "adj",
    syllables: "re-PROACH-ful",
    meaningEasyEn: "showing you are unhappy with someone",
    exampleEasyEn: "Mom gave me a reproachful look when I lied.",
    chapter: 1,
    imageSrc: reproachfulImg,
    difficulty: "challenge",
  },
  {
    id: "ch1_persuade",
    word: "persuade",
    pos: "v",
    syllables: "per-SUADE",
    meaningEasyEn: "to try to make someone agree with you",
    exampleEasyEn: "I tried to persuade my friend to join our game.",
    chapter: 1,
    imageSrc: persuadeImg,
    difficulty: "challenge",
  },
  {
    id: "ch1_ominous",
    word: "ominous",
    pos: "adj",
    syllables: "OM-i-nous",
    meaningEasyEn: "feeling like something bad might happen",
    exampleEasyEn: "The dark clouds looked ominous.",
    chapter: 1,
    imageSrc: ominousImg,
    difficulty: "challenge",
  },
  {
    id: "ch1_gaunt",
    word: "gaunt",
    pos: "adj",
    syllables: "gaunt",
    meaningEasyEn: "very thin and tired-looking",
    exampleEasyEn: "The lost cat looked gaunt and hungry.",
    chapter: 1,
    imageSrc: gauntImg,
    difficulty: "challenge",
  },
  {
    id: "ch1_maniac",
    word: "maniac",
    pos: "n",
    syllables: "MA-ni-ac",
    meaningEasyEn: "someone acting crazy and out of control (not a kind word)",
    exampleEasyEn: "The crowd said he was a maniac, but we stayed calm.",
    chapter: 1,
    imageSrc: maniacImg,
    difficulty: "challenge",
  },
  {
    id: "ch1_lunatic",
    word: "lunatic",
    pos: "n",
    syllables: "LU-na-tic",
    meaningEasyEn: "a person acting very foolish or strange (not a kind word)",
    exampleEasyEn: "Don’t call people lunatic. Use kind words.",
    chapter: 1,
    imageSrc: lunaticImg,
    difficulty: "challenge",
  },

  // ---- Chapter 2 Challenge ----
  {
    id: "ch2_insolent",
    word: "insolent",
    pos: "adj",
    syllables: "IN-so-lent",
    meaningEasyEn: "very rude and not respectful",
    exampleEasyEn: "It is insolent to talk back to the teacher.",
    chapter: 2,
    imageSrc: insolentImg,
    difficulty: "challenge",
  },
  {
    id: "ch2_wastrel",
    word: "wastrel",
    pos: "n",
    syllables: "WAS-trel",
    meaningEasyEn: "a person who wastes money or time",
    exampleEasyEn: "He was a wastrel and never saved his coins.",
    chapter: 2,
    imageSrc: wastrelImg,
    difficulty: "challenge",
  },
  {
    id: "ch2_glazed",
    word: "glazed",
    pos: "adj",
    syllables: "glazed",
    meaningEasyEn: "shiny and blank, not focused",
    exampleEasyEn: "His eyes looked glazed after staying up late.",
    chapter: 2,
    imageSrc: glazedImg,
    difficulty: "challenge",
  },
  {
    id: "ch2_apoplectic",
    word: "apoplectic",
    pos: "adj",
    syllables: "ap-o-PLEC-tic",
    meaningEasyEn: "extremely angry",
    exampleEasyEn: "Dad was apoplectic when he saw the broken window.",
    chapter: 2,
    imageSrc: apoplecticImg,
    difficulty: "challenge",
  },
  {
    id: "ch2_wrench",
    word: "wrench",
    pos: "v",
    syllables: "wrench",
    meaningEasyEn: "to pull or twist suddenly and hard",
    exampleEasyEn: "She wrenched the door open.",
    chapter: 2,
    imageSrc: wrenchImg,
    difficulty: "challenge",
  },
  {
    id: "ch2_surge",
    word: "surge",
    pos: "v",
    syllables: "surge",
    meaningEasyEn: "to move strongly and quickly",
    exampleEasyEn: "Big waves surged toward the shore.",
    chapter: 2,
    imageSrc: surgeImg,
    difficulty: "challenge",
  },

  // ---- Chapter 3 Basic (12) ----
  {
    id: "ch3_reliable",
    word: "reliable",
    pos: "adj",
    syllables: "re-LI-a-ble",
    meaningEasyEn: "you can trust it; it works well",
    exampleEasyEn: "This watch is reliable and always tells the right time.",
    chapter: 3,
    imageSrc: reliableImg,
    difficulty: "basic",
  },
  {
    id: "ch3_stealthily",
    word: "stealthily",
    pos: "adv",
    syllables: "STEALTH-i-ly",
    meaningEasyEn: "quietly, so no one notices",
    exampleEasyEn: "The cat moved stealthily toward the snack.",
    chapter: 3,
    imageSrc: stealthilyImg,
    difficulty: "basic",
  },
  {
    id: "ch3_convict",
    word: "convict",
    pos: "n",
    syllables: "CON-vict",
    meaningEasyEn: "a person in prison",
    exampleEasyEn: "The convict stayed behind the locked gate.",
    chapter: 3,
    imageSrc: convictImg,
    difficulty: "basic",
  },
  {
    id: "ch3_filthy",
    word: "filthy",
    pos: "adj",
    syllables: "FIL-thy",
    meaningEasyEn: "very dirty",
    exampleEasyEn: "His shoes were filthy after the muddy game.",
    chapter: 3,
    imageSrc: filthyImg,
    difficulty: "basic",
  },
  {
    id: "ch3_suspicious",
    word: "suspicious",
    pos: "adj",
    syllables: "sus-PI-cious",
    meaningEasyEn: "not trusting; thinking something is wrong",
    exampleEasyEn: "She felt suspicious about the strange sound.",
    chapter: 3,
    imageSrc: suspiciousImg,
    difficulty: "basic",
  },
  {
    id: "ch3_sprint",
    word: "sprint",
    pos: "v",
    syllables: "sprint",
    meaningEasyEn: "to run very fast for a short time",
    exampleEasyEn: "He sprinted to catch the bus.",
    chapter: 3,
    imageSrc: sprintImg,
    difficulty: "basic",
  },
  {
    id: "ch3_frantic",
    word: "frantic",
    pos: "adj",
    syllables: "FRAN-tic",
    meaningEasyEn: "very worried and rushing around",
    exampleEasyEn: "She was frantic when she lost her homework.",
    chapter: 3,
    imageSrc: franticImg,
    difficulty: "basic",
  },
  {
    id: "ch3_restriction",
    word: "restriction",
    pos: "n",
    syllables: "re-STRIC-tion",
    meaningEasyEn: "a rule that limits what you can do",
    exampleEasyEn: "There is a restriction: no running in the hall.",
    chapter: 3,
    imageSrc: restrictionImg,
    difficulty: "basic",
  },
  {
    id: "ch3_outcast",
    word: "outcast",
    pos: "n",
    syllables: "OUT-cast",
    meaningEasyEn: "a person left out by others",
    exampleEasyEn: "No one should be an outcast at school.",
    chapter: 3,
    imageSrc: outcastImg,
    difficulty: "basic",
  },
  {
    id: "ch3_prospect",
    word: "prospect",
    pos: "n",
    syllables: "PROS-pect",
    meaningEasyEn: "something that might happen in the future",
    exampleEasyEn: "The prospect of a trip made her smile.",
    chapter: 3,
    imageSrc: prospectImg,
    difficulty: "basic",
  },
  {
    id: "ch3_elude",
    word: "elude",
    pos: "v",
    syllables: "e-LUDE",
    meaningEasyEn: "to escape; to avoid being caught",
    exampleEasyEn: "The ball eluded his hands and rolled away.",
    chapter: 3,
    imageSrc: eludeImg,
    difficulty: "basic",
  },
  {
    id: "ch3_expel",
    word: "expel",
    pos: "v",
    syllables: "ex-PEL",
    meaningEasyEn: "to force someone to leave",
    exampleEasyEn: "The referee can expel a player for cheating.",
    chapter: 3,
    imageSrc: expelImg,
    difficulty: "basic",
  },

  // ---- Chapter 3 Challenge (6) ----
  {
    id: "ch3_protruding",
    word: "protruding",
    pos: "adj",
    syllables: "pro-TRU-ding",
    meaningEasyEn: "sticking out",
    exampleEasyEn: "A pencil was protruding from his bag.",
    chapter: 3,
    imageSrc: protrudingImg,
    difficulty: "challenge",
  },
  {
    id: "ch3_dispatched",
    word: "dispatched",
    pos: "v",
    syllables: "dis-PATCHED",
    meaningEasyEn: "sent off quickly",
    exampleEasyEn: "Mom dispatched the letter right away.",
    chapter: 3,
    imageSrc: dispatchedImg,
    difficulty: "challenge",
  },
  {
    id: "ch3_apothecary",
    word: "apothecary",
    pos: "n",
    syllables: "a-POTH-e-ca-ry",
    meaningEasyEn: "a shop that sells medicine",
    exampleEasyEn: "We visited an apothecary to buy medicine.",
    chapter: 3,
    imageSrc: apothecaryImg,
    difficulty: "challenge",
  },
  {
    id: "ch3_sumptuous",
    word: "sumptuous",
    pos: "adj",
    syllables: "SUMP-tu-ous",
    meaningEasyEn: "very rich, fancy, and comfortable",
    exampleEasyEn: "The hotel had a sumptuous breakfast.",
    chapter: 3,
    imageSrc: sumptuousImg,
    difficulty: "challenge",
  },
  {
    id: "ch3_retorted",
    word: "retorted",
    pos: "v",
    syllables: "re-TOR-ted",
    meaningEasyEn: "answered back quickly",
    exampleEasyEn: "He retorted with a quick reply.",
    chapter: 3,
    imageSrc: retortedImg,
    difficulty: "challenge",
  },
  {
    id: "ch3_deafening",
    word: "deafening",
    pos: "adj",
    syllables: "DEF-en-ing",
    meaningEasyEn: "so loud it hurts your ears",
    exampleEasyEn: "The fireworks were deafening.",
    chapter: 3,
    imageSrc: deafeningImg,
    difficulty: "challenge",
  },

  // ---- Chapter 4 Basic (12) ----
  {
    id: "ch4_refuge",
    word: "refuge",
    pos: "n",
    syllables: "REF-uge",
    meaningEasyEn: "a safe place or shelter",
    exampleEasyEn: "We took refuge under a roof when it rained.",
    chapter: 4,
    imageSrc: refugeImg,
    difficulty: "basic",
  },
  {
    id: "ch4_grave",
    word: "grave",
    pos: "adj",
    syllables: "grave",
    meaningEasyEn: "serious and not joking",
    exampleEasyEn: "The teacher’s face looked grave.",
    chapter: 4,
    imageSrc: graveImg,
    difficulty: "basic",
  },
  {
    id: "ch4_strain",
    word: "strain",
    pos: "v",
    syllables: "strain",
    meaningEasyEn: "to make something tense or tight",
    exampleEasyEn: "He strained to hear the quiet sound.",
    chapter: 4,
    imageSrc: strainImg,
    difficulty: "basic",
  },
  {
    id: "ch4_lenient",
    word: "lenient",
    pos: "adj",
    syllables: "LE-ni-ent",
    meaningEasyEn: "not strict; gentle about rules",
    exampleEasyEn: "The coach was lenient and gave us another try.",
    chapter: 4,
    imageSrc: lenientImg,
    difficulty: "basic",
  },
  {
    id: "ch4_stricken",
    word: "stricken",
    pos: "adj",
    syllables: "STRICK-en",
    meaningEasyEn: "very upset or shocked",
    exampleEasyEn: "He was stricken when his toy broke.",
    chapter: 4,
    imageSrc: strickenImg,
    difficulty: "basic",
  },
  {
    id: "ch4_remote",
    word: "remote",
    pos: "adj",
    syllables: "re-MOTE",
    meaningEasyEn: "far away; not likely",
    exampleEasyEn: "It’s remote that we will finish in one minute.",
    chapter: 4,
    imageSrc: remoteImg,
    difficulty: "basic",
  },
  {
    id: "ch4_suspect",
    word: "suspect",
    pos: "v",
    syllables: "sus-PECT",
    meaningEasyEn: "to think something might be true",
    exampleEasyEn: "I suspect it will rain today.",
    chapter: 4,
    imageSrc: suspectImg,
    difficulty: "basic",
  },
  {
    id: "ch4_nettled",
    word: "nettled",
    pos: "adj",
    syllables: "NET-tled",
    meaningEasyEn: "a little annoyed",
    exampleEasyEn: "He felt nettled by the rude comment.",
    chapter: 4,
    imageSrc: nettledImg,
    difficulty: "basic",
  },
  {
    id: "ch4_foreboding",
    word: "foreboding",
    pos: "n",
    syllables: "for-BO-ding",
    meaningEasyEn: "a feeling that something bad might happen",
    exampleEasyEn: "The dark sky gave him foreboding.",
    chapter: 4,
    imageSrc: forebodingImg,
    difficulty: "basic",
  },
  {
    id: "ch4_delicate",
    word: "delicate",
    pos: "adj",
    syllables: "DEL-i-cate",
    meaningEasyEn: "easy to break or hurt",
    exampleEasyEn: "Be careful with this delicate glass.",
    chapter: 4,
    imageSrc: delicateImg,
    difficulty: "basic",
  },
  {
    id: "ch4_plead",
    word: "plead",
    pos: "v",
    syllables: "plead",
    meaningEasyEn: "to ask strongly and politely",
    exampleEasyEn: "He pleaded for one more chance.",
    chapter: 4,
    imageSrc: pleadImg,
    difficulty: "basic",
  },
  {
    id: "ch4_terror",
    word: "terror",
    pos: "n",
    syllables: "TER-ror",
    meaningEasyEn: "a very strong fear",
    exampleEasyEn: "She felt terror during the thunder.",
    chapter: 4,
    imageSrc: terrorImg,
    difficulty: "basic",
  },

  // ---- Chapter 4 Challenge (6) ----
  {
    id: "ch4_knickerbockers",
    word: "knickerbockers",
    pos: "n",
    syllables: "NICK-er-bock-ers",
    meaningEasyEn: "knee-length pants",
    exampleEasyEn: "He wore knickerbockers in an old picture.",
    chapter: 4,
    imageSrc: knickerbockersImg,
    difficulty: "challenge",
  },
  {
    id: "ch4_elastic",
    word: "elastic",
    pos: "adj",
    syllables: "e-LAS-tic",
    meaningEasyEn: "stretchy",
    exampleEasyEn: "This band is elastic and stretches easily.",
    chapter: 4,
    imageSrc: elastic2Img,
    difficulty: "challenge",
  },
  {
    id: "ch4_porridge",
    word: "porridge",
    pos: "n",
    syllables: "POR-ridge",
    meaningEasyEn: "soft food made by boiling oats",
    exampleEasyEn: "She ate warm porridge for breakfast.",
    chapter: 4,
    imageSrc: porridgeImg,
    difficulty: "challenge",
  },
  {
    id: "ch4_scruffs",
    word: "scruff",
    pos: "n",
    syllables: "scruff",
    meaningEasyEn: "the back of the neck",
    exampleEasyEn: "He held the kitten by the scruff very gently.",
    chapter: 4,
    imageSrc: scruffsImg,
    difficulty: "challenge",
  },
  {
    id: "ch4_tufts",
    word: "tufts",
    pos: "n",
    syllables: "tufts",
    meaningEasyEn: "small bunches of hair, feathers, or grass",
    exampleEasyEn: "Tufts of grass grew by the road.",
    chapter: 4,
    imageSrc: tuftsImg,
    difficulty: "challenge",
  },
  {
    id: "ch4_ambling",
    word: "amble",
    pos: "v",
    syllables: "AM-ble",
    meaningEasyEn: "to walk slowly and relaxed",
    exampleEasyEn: "They ambled through the park.",
    chapter: 4,
    imageSrc: amblingImg,
    difficulty: "challenge",
  },
];

export const CH1_WORDS = VOCAB_WORDS.filter((w) => w.chapter === 1);
export const CH2_WORDS = VOCAB_WORDS.filter((w) => w.chapter === 2);
export const CH3_WORDS = VOCAB_WORDS.filter((w) => w.chapter === 3);
export const CH4_WORDS = VOCAB_WORDS.filter((w) => w.chapter === 4);

export const BASIC_WORDS = VOCAB_WORDS.filter((w) => w.difficulty === "basic");
export const CHALLENGE_WORDS = VOCAB_WORDS.filter((w) => w.difficulty === "challenge");

export function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(n, copy.length));
}
