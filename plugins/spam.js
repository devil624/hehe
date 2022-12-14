const { bot, setSpam, getSpam, genButtonMessage } = require('../lib')

bot(
	{
		pattern: 'antispam ?(.*)',
		fromMe: true,
		desc: 'anti spam group chat',
		onlyGroup: true,
		type: 'group',
	},
	async (message, match) => {
		if (!match || (match != 'on' && match != 'off')) {
			const { enabled } = await getSpam(message.jid)
			return await message.sendMessage(
				await genButtonMessage(
					[
						{
							text: enabled ? 'OFF' : 'ON',
							id: `antispam ${enabled ? 'off' : 'on'}`,
						},
					],
					'AntiSpam\nExample : antispam on/off'
				),
				{},
				'button'
			)
		}
		await setSpam(message.jid, match == 'on')
		await message.sendMessage(
			`_AntiSpam ${match == 'on' ? 'activated' : 'deactivated.'}_`
		)
	}
)
