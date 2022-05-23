// Escape special characters that are used in Discord's markdown
function discordEscape(literal_string) {
	return literal_string.replace(/[*_]/g, '\\$&');
}

module.exports = {
	discordEscape: discordEscape,
};