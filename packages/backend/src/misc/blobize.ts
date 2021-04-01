/*
{
	// Generate replace lists
	const emojilist = require('./emojilist.json');
	const emojies = ['😮‍💨', '😵‍💫', '🫠', '🫣', '🫢', '🫡', '🫥', '🫤', '🥹', '🥲', '😶‍🌫️', '🥸', '🐱', '👿', '📔', '📕', '📖', '📗', '📘', '📙', '📚', '😀', '😁', '😂', '😃', '😄', '😅', '😆', '😇', '😈', '😉', '😊', '😋', '😌', '😍', '😎', '😏', '😐', '😑', '😒', '😓', '😔', '😕', '😖', '😗', '😘', '😙', '😚', '😛', '😜', '😝', '😞', '😟', '😠', '😡', '😢', '😣', '😤', '😥', '😦', '😧', '😨', '😩', '😪', '😫', '😬', '😭', '😮', '😯', '😰', '😱', '😲', '😳', '😴', '😵', '😶', '😷', '😸', '😹', '😺', '😻', '😼', '😽', '😾', '😿', '🙀', '🙁', '🙂', '🙃', '🙄', '🤐', '🤑', '🤒', '🤓', '🤔', '🤕', '🤗', '🤠', '🤡', '🤢', '🤣', '🤤', '🤥', '🤧', '🤨', '🤩', '🤪', '🤫', '🤬', '🤭', '🤮', '🤯', '🥰', '🥱', '🥳', '🥴', '🥵', '🥶', '🥺', '🧐', '🧳', '🧴', '🧾', '☹', '☺️'];
	emojies.forEach(e => { console.log('.replace(/' + e + '/g, \':blob_' + emojilist.find(elem => elem.char == e).name + ':\')') });

	//  '🧟', '🦸', '🦹' 
	// .replace(/🦸(\u200d[♂️♀️])?/g, ':blob_superman:')
	// .replace(/🦹(\u200d[♂️♀️])?/g, ':blob_supervillain:')
	// .replace(/🧟(\u200d[♂️♀️])?/g, ':blob_zombie:');
}

{
	// Rename emoji files ( you need to upload them manually)
	const BLOBMOJI_PATH = '/mnt/d/Work/blobmoji/svg';
	const TMPDIR = '/mnt/d/Work/blobmoji_to_upload';

	const fs = require('fs');
	const sharp = require("sharp");
	const archiver = require("archiver");

	const emojilist = require('../../../frontend/src/emojilist.json');
	const emojis = ['😮‍💨', '😵‍💫', '🫠', '🫣', '🫢', '🫡', '🫥', '🫤', '🥹', '🥲', '😶‍🌫️', '🥸', '🐱', '👿', '📔', '📕', '📖', '📗', '📘', '📙', '📚', '😀', '😁', '😂', '😃', '😄', '😅', '😆', '😇', '😈', '😉', '😊', '😋', '😌', '😍', '😎', '😏', '😐', '😑', '😒', '😓', '😔', '😕', '😖', '😗', '😘', '😙', '😚', '😛', '😜', '😝', '😞', '😟', '😠', '😡', '😢', '😣', '😤', '😥', '😦', '😧', '😨', '😩', '😪', '😫', '😬', '😭', '😮', '😯', '😰', '😱', '😲', '😳', '😴', '😵', '😶', '😷', '😸', '😹', '😺', '😻', '😼', '😽', '😾', '😿', '🙀', '🙁', '🙂', '🙃', '🙄', '🤐', '🤑', '🤒', '🤓', '🤔', '🤕', '🤗', '🤠', '🤡', '🤢', '🤣', '🤤', '🤥', '🤧', '🤨', '🤩', '🤪', '🤫', '🤬', '🤭', '🤮', '🤯', '🥰', '🥱', '🥳', '🥴', '🥵', '🥶', '🥺', '🧐', '🧳', '🧴', '🧾', '☹', '☺️'];

	let meta = {
		metaVersion: 2,
		emojis: []
	};

	const promises = [];
	emojis.forEach(e => {
		try {
			const name = emojilist.find(elem => elem.char == e).name;
			var dest = TMPDIR + '/blob_' + name + '.png';
			var src = BLOBMOJI_PATH + '/emoji_u' + e.codePointAt(0).toString(16) + '.svg';

			if (!fs.existsSync(src))
				src = BLOBMOJI_PATH + '/' + name.replaceAll("_", " ") + '.svg';

			promises.push(sharp(src).resize(512, 512).png().toFile(dest));
			console.log(e, src, '->', dest);

			meta.emojis.push({
				downloaded: true,
				fileName: "blob_" + name + ".png",
				emoji: {
					name: "blob_" + name,
					category: "Blobmoji",
					type: "image/png",
					aliases: emojilist.find(elem => elem.char == e).keywords
				}
			});
		} catch (err) {
			console.log(e, err);
		}
	});

	Promise.all(promises).then(() => {
		fs.writeFileSync(TMPDIR + "/meta.json", JSON.stringify(meta));

		const archive = archiver('zip', {
			zlib: { level: 0 },
		});
		const dest = fs.createWriteStream(TMPDIR + ".zip");
		dest.on("close", () => {
			console.log("done");
		})
		archive.pipe(dest);
		archive.directory(TMPDIR, false);
		archive.finalize();
	});
}
*/

export function blobize(text: string): string {
	return text.replace(/😮‍💨/g, ':blob_face_exhaling:')
		.replace(/😵‍💫/g, ':blob_face_with_spiral_eyes:')
		.replace(/🫠/g, ':blob_melting_face:')
		.replace(/🫣/g, ':blob_face_with_peeking_eye:')
		.replace(/🫢/g, ':blob_face_with_open_eyes_and_hand_over_mouth:')
		.replace(/🫡/g, ':blob_saluting_face:')
		.replace(/🫥/g, ':blob_dotted_line_face:')
		.replace(/🫤/g, ':blob_face_with_diagonal_mouth:')
		.replace(/🥹/g, ':blob_face_holding_back_tears:')
		.replace(/🥲/g, ':blob_smiling_face_with_tear:')
		.replace(/😶‍🌫️/g, ':blob_face_in_clouds:')
		.replace(/🥸/g, ':blob_disguised_face:')
		.replace(/🐱/g, ':blob_cat:')
		.replace(/👿/g, ':blob_imp:')
		.replace(/📔/g, ':blob_notebook_with_decorative_cover:')
		.replace(/📕/g, ':blob_closed_book:')
		.replace(/📖/g, ':blob_open_book:')
		.replace(/📗/g, ':blob_green_book:')
		.replace(/📘/g, ':blob_blue_book:')
		.replace(/📙/g, ':blob_orange_book:')
		.replace(/📚/g, ':blob_books:')
		.replace(/😀/g, ':blob_grinning:')
		.replace(/😁/g, ':blob_grin:')
		.replace(/😂/g, ':blob_joy:')
		.replace(/😃/g, ':blob_smiley:')
		.replace(/😄/g, ':blob_smile:')
		.replace(/😅/g, ':blob_sweat_smile:')
		.replace(/😆/g, ':blob_laughing:')
		.replace(/😇/g, ':blob_innocent:')
		.replace(/😈/g, ':blob_smiling_imp:')
		.replace(/😉/g, ':blob_wink:')
		.replace(/😊/g, ':blob_blush:')
		.replace(/😋/g, ':blob_yum:')
		.replace(/😌/g, ':blob_relieved:')
		.replace(/😍/g, ':blob_heart_eyes:')
		.replace(/😎/g, ':blob_sunglasses:')
		.replace(/😏/g, ':blob_smirk:')
		.replace(/😐/g, ':blob_neutral_face:')
		.replace(/😑/g, ':blob_expressionless:')
		.replace(/😒/g, ':blob_unamused:')
		.replace(/😓/g, ':blob_sweat:')
		.replace(/😔/g, ':blob_pensive:')
		.replace(/😕/g, ':blob_confused:')
		.replace(/😖/g, ':blob_confounded:')
		.replace(/😗/g, ':blob_kissing:')
		.replace(/😘/g, ':blob_kissing_heart:')
		.replace(/😙/g, ':blob_kissing_smiling_eyes:')
		.replace(/😚/g, ':blob_kissing_closed_eyes:')
		.replace(/😛/g, ':blob_stuck_out_tongue:')
		.replace(/😜/g, ':blob_stuck_out_tongue_winking_eye:')
		.replace(/😝/g, ':blob_stuck_out_tongue_closed_eyes:')
		.replace(/😞/g, ':blob_disappointed:')
		.replace(/😟/g, ':blob_worried:')
		.replace(/😠/g, ':blob_angry:')
		.replace(/😡/g, ':blob_rage:')
		.replace(/😢/g, ':blob_cry:')
		.replace(/😣/g, ':blob_persevere:')
		.replace(/😤/g, ':blob_triumph:')
		.replace(/😥/g, ':blob_disappointed_relieved:')
		.replace(/😦/g, ':blob_frowning:')
		.replace(/😧/g, ':blob_anguished:')
		.replace(/😨/g, ':blob_fearful:')
		.replace(/😩/g, ':blob_weary:')
		.replace(/😪/g, ':blob_sleepy:')
		.replace(/😫/g, ':blob_tired_face:')
		.replace(/😬/g, ':blob_grimacing:')
		.replace(/😭/g, ':blob_sob:')
		.replace(/😮/g, ':blob_open_mouth:')
		.replace(/😯/g, ':blob_hushed:')
		.replace(/😰/g, ':blob_cold_sweat:')
		.replace(/😱/g, ':blob_scream:')
		.replace(/😲/g, ':blob_astonished:')
		.replace(/😳/g, ':blob_flushed:')
		.replace(/😴/g, ':blob_sleeping:')
		.replace(/😵/g, ':blob_dizzy_face:')
		.replace(/😶/g, ':blob_no_mouth:')
		.replace(/😷/g, ':blob_mask:')
		.replace(/😸/g, ':blob_smile_cat:')
		.replace(/😹/g, ':blob_joy_cat:')
		.replace(/😺/g, ':blob_smiley_cat:')
		.replace(/😻/g, ':blob_heart_eyes_cat:')
		.replace(/😼/g, ':blob_smirk_cat:')
		.replace(/😽/g, ':blob_kissing_cat:')
		.replace(/😾/g, ':blob_pouting_cat:')
		.replace(/😿/g, ':blob_crying_cat_face:')
		.replace(/🙀/g, ':blob_scream_cat:')
		.replace(/🙁/g, ':blob_slightly_frowning_face:')
		.replace(/🙂/g, ':blob_slightly_smiling_face:')
		.replace(/🙃/g, ':blob_upside_down_face:')
		.replace(/🙄/g, ':blob_roll_eyes:')
		.replace(/🤐/g, ':blob_zipper_mouth_face:')
		.replace(/🤑/g, ':blob_money_mouth_face:')
		.replace(/🤒/g, ':blob_face_with_thermometer:')
		.replace(/🤓/g, ':blob_nerd_face:')
		.replace(/🤔/g, ':blob_thinking:')
		.replace(/🤕/g, ':blob_face_with_head_bandage:')
		.replace(/🤗/g, ':blob_hugs:')
		.replace(/🤠/g, ':blob_cowboy_hat_face:')
		.replace(/🤡/g, ':blob_clown_face:')
		.replace(/🤢/g, ':blob_nauseated_face:')
		.replace(/🤣/g, ':blob_rofl:')
		.replace(/🤤/g, ':blob_drooling_face:')
		.replace(/🤥/g, ':blob_lying_face:')
		.replace(/🤧/g, ':blob_sneezing_face:')
		.replace(/🤨/g, ':blob_raised_eyebrow:')
		.replace(/🤩/g, ':blob_star_struck:')
		.replace(/🤪/g, ':blob_zany:')
		.replace(/🤫/g, ':blob_shushing:')
		.replace(/🤬/g, ':blob_symbols_over_mouth:')
		.replace(/🤭/g, ':blob_hand_over_mouth:')
		.replace(/🤮/g, ':blob_vomiting:')
		.replace(/🤯/g, ':blob_exploding_head:')
		.replace(/🥰/g, ':blob_smiling_face_with_three_hearts:')
		.replace(/🥱/g, ':blob_yawning:')
		.replace(/🥳/g, ':blob_partying:')
		.replace(/🥴/g, ':blob_woozy:')
		.replace(/🥵/g, ':blob_hot:')
		.replace(/🥶/g, ':blob_cold:')
		.replace(/🥺/g, ':blob_pleading:')
		.replace(/🧐/g, ':blob_monocle:')
		.replace(/🧳/g, ':blob_luggage:')
		.replace(/🧴/g, ':blob_lotion_bottle:')
		.replace(/🧾/g, ':blob_receipt:')
		.replace(/☹/g, ':blob_frowning_face:')
		.replace(/☺️/g, ':blob_relaxed:')

		.replace(/🦸(\u200d[♂️♀️])?/g, ':blob_superman:')
		.replace(/🦹(\u200d[♂️♀️])?/g, ':blob_supervillain:')
		.replace(/🧟(\u200d[♂️♀️])?/g, ':blob_zombie:');
}
