/* eslint-disable brace-style */
/* eslint-disable indent */
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { token } = require('./config.json');


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.stats.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

    global.userid = ((interaction.options.getUser('input')) ? (interaction.options.getUser('input')).id : (interaction.user.id));
    const user = ((interaction.options.getUser('input')) ? (interaction.options.getUser('input')).username : (interaction.user).username);
    const avatar = ((interaction.options.getUser('input')) ? (interaction.options.getUser('input')) : (interaction.user));
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    const dataTwo = JSON.parse(fs.readFileSync('./data2.json', 'utf8'));
    const dataThree = JSON.parse(fs.readFileSync('./data3.json', 'utf8'));
    global.guildid = ((interaction.guild.id) ? (interaction.guild.id) : 'not needed');
    const stats = (data[`${guildid}+${userid}`]);
    const statsTwo = (dataTwo[`${guildid}+${userid}`]);
    const statsThree = (dataThree[`${guildid}+${userid}`]);
    const bioSave = JSON.parse(fs.readFileSync('./bio.json', 'utf8'));
    const bio = (bioSave[`${guildid}+${userid}`]);

    if (interaction.commandName === 'invite') {
        let invite = await interaction.channel.createInvite(
            {
              maxAge: 10 * 60 * 1000, // maximum time for the invite, in milliseconds
              maxUses: 1 // maximum times it can be used
            },
            `Requested with command by ${interaction.member.tag}`
        )
        interaction.reply(invite ? `Here's your invite: ${invite}` : "There has been an error during the creation of the invite.")
    }
    if (interaction.commandName === 'roll') {
        const sides = ((interaction.options.getNumber('num')) ? (interaction.options.getNumber('num')) : '20');
        function randomIntFromInterval(sides) { // min and max included 
            return Math.floor(Math.random() * (sides - 1 + 1) + 1)
        }
        const rolled = randomIntFromInterval(sides)
        interaction.reply(`${rolled}`)

    }
    if (interaction.commandName === 'makebio') {

        try {
            // Create the modal
            const modal = new ModalBuilder()
                .setCustomId('bio')
                .setTitle('Bio');
    
            // Add components to modal
    
    
            const nameInput = new TextInputBuilder()
                .setCustomId('nameInput')
                .setLabel(`Character's Name:`)
                .setStyle(TextInputStyle.Short)
                .setValue(`${bio.name}`);
    
            const typeInput = new TextInputBuilder()
                .setCustomId('typeInput')
                .setLabel('What type of character is it?')
                .setStyle(TextInputStyle.Short)
                .setValue(`${bio.type}`);
                // .setValue('Test');
            const weaponsInput = new TextInputBuilder()
                .setCustomId('weaponsInput')
                .setLabel('What weapons they come with:')
                .setStyle(TextInputStyle.Short)
                .setValue(`${bio.weapons}`);
                // .setValue('Test');
    
            const abilitiesInput = new TextInputBuilder()
                .setCustomId('abilitiesInput')
                .setLabel('Abilities:')
                .setStyle(TextInputStyle.Short)
                .setValue(`${bio.abilities}`);
    
            const otherInput = new TextInputBuilder()
                .setCustomId('otherInput')
                .setLabel('All the other stuff:')
                .setStyle(TextInputStyle.Short)
                .setValue(`${bio.other}`);
    
    
            // An action row only holds one text input,
            // so you need one action row per text input.
            const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
            const secondActionRow = new ActionRowBuilder().addComponents(typeInput);
            const thirdActionRow = new ActionRowBuilder().addComponents(weaponsInput);
            const fourthActionRow = new ActionRowBuilder().addComponents(abilitiesInput);
            const fifthActionRow = new ActionRowBuilder().addComponents(otherInput);

    
            // Add inputs to the modal
            modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);
    
            // Show the modal to the user
            await interaction.showModal(modal);
            } catch (error) {
                // eslint-disable-next-line quotes
                await interaction.reply({ content: `Looks like this user doesn't have any data for this page. Give me a moment to create some!`, ephemeral: true });
                const nameInput = 'No Data';
                const typeInput = 'No Data';
                const weaponsInput = 'No Data';
                const abilitiesInput = 'No Data';
                const otherInput = 'No Data';               
    
    
                bioSave[`${guildid}+${userid}`] = {
                    name: nameInput,
                    type: typeInput,
                    weapons: weaponsInput,
                    abilities: abilitiesInput,
                    other: otherInput,
                };
                fs.writeFileSync('./bio.json', JSON.stringify(bioSave, null, 4));
                // eslint-disable-next-line quotes
                await interaction.editReply({ content: `Data created! Please run this command again!`, ephemeral: true });
        }
    }
	if (interaction.commandName === 'page') {

    try {
		// Create the modal
		const modal = new ModalBuilder()
			.setCustomId('myModal')
			.setTitle('My Modal');

		// Add components to modal


		const levelInput = new TextInputBuilder()
			.setCustomId('levelInput')
			.setLabel('Level')
			.setStyle(TextInputStyle.Short)
            .setValue(`${stats.level}`);

		const speedInput = new TextInputBuilder()
			.setCustomId('speedInput')
			.setLabel('Speed')
			.setStyle(TextInputStyle.Short)
            .setValue(`${stats.speed}`);
			// .setValue('Test');
        const healthInput = new TextInputBuilder()
			.setCustomId('healthInput')
			.setLabel('Health')
			.setStyle(TextInputStyle.Short)
            .setValue(`${stats.health}`);
			// .setValue('Test');

        const maxHealthInput = new TextInputBuilder()
			.setCustomId('maxHealthInput')
			.setLabel('Max Health')
			.setStyle(TextInputStyle.Short)
            .setValue(`${stats.maxHealth}`);

        const attackPhysInput = new TextInputBuilder()
			.setCustomId('attackPhysInput')
			.setLabel('Attack (Phys)')
			.setStyle(TextInputStyle.Short)
            .setValue(`${stats.attackPhys}`);


		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder().addComponents(levelInput);
		const secondActionRow = new ActionRowBuilder().addComponents(speedInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(healthInput);
        const fourthActionRow = new ActionRowBuilder().addComponents(maxHealthInput);
        const fifthActionRow = new ActionRowBuilder().addComponents(attackPhysInput);

		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);

		// Show the modal to the user
		await interaction.showModal(modal);
        } catch (error) {
            // eslint-disable-next-line quotes
            await interaction.reply({ content: `Looks like this user doesn't have any data for this page. Give me a moment to create some!`, ephemeral: true });
            const levelInput = 'No Data';
            const speedInput = 'No Data';
            const healthInput = 'No Data';
            const maxHealthInput = 'No Data';
            const attackPhysInput = 'No Data';


            data[`${guildid}+${userid}`] = {
                level: levelInput,
                speed: speedInput,
                health: healthInput,
                maxHealth: maxHealthInput,
                attackPhys: attackPhysInput,
            };
            fs.writeFileSync('./data.json', JSON.stringify(data, null, 4));
            // eslint-disable-next-line quotes
            await interaction.editReply({ content: `Data created! Please run this command again!`, ephemeral: true });
	}
}
if (interaction.commandName === 'page2') {


        try {


		// Create the modal
		const modal = new ModalBuilder()
			.setCustomId('myModal1')
			.setTitle('Form 2');

        const supportInput = new TextInputBuilder()
			.setCustomId('supportInput')
			.setLabel('Support')
			.setStyle(TextInputStyle.Short)
            .setValue(`${statsTwo.support}`);

        const attackSpellSkillInput = new TextInputBuilder()
			.setCustomId('attackSpellSkillInput')
			.setLabel('Attack (Spell/Skill)')
			.setStyle(TextInputStyle.Short)
            .setValue(`${statsTwo.attackSpellSkill}`);

        const defenseInput = new TextInputBuilder()
			.setCustomId('defenseInput')
			.setLabel('Defense')
			.setStyle(TextInputStyle.Short)
            .setValue(`${statsTwo.defense}`);

        const mpInput = new TextInputBuilder()
			.setCustomId('mpInput')
			.setLabel('MP')
			.setStyle(TextInputStyle.Short)
            .setValue(`${statsTwo.mp}`);

        const currentSkillsInput = new TextInputBuilder()
			.setCustomId('currentSkillsInput')
			.setLabel('Current Skills')
			.setStyle(TextInputStyle.Paragraph)
            .setValue(`${statsTwo.currentSkills}`);


		// An action row only holds one text input,
		// so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(supportInput);
        const secondActionRow = new ActionRowBuilder().addComponents(attackSpellSkillInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(defenseInput);
        const fourthActionRow = new ActionRowBuilder().addComponents(mpInput);
        const fifthActionRow = new ActionRowBuilder().addComponents(currentSkillsInput);


		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);


		// Show the modal to the user
		await interaction.showModal(modal);
    } catch (error) {
        // eslint-disable-next-line quotes
        await interaction.reply({ content: `Looks like this user doesn't have any data for this page. Give me a moment to create some!`, ephemeral: true });
        const supportInput = 'No Data';
        const attackSpellSkillInput = 'No Data';
        const defenseInput = 'No Data';
        const mpInput = 'No Data';
        const currentSkillsInput = 'No Data';

        dataTwo[`${guildid}+${userid}`] = {
            support: supportInput,
            attackSpellSkill: attackSpellSkillInput,
            defense: defenseInput,
            mp: mpInput,
            currentSkills: currentSkillsInput,
        };
        fs.writeFileSync('./data2.json', JSON.stringify(dataTwo, null, 4));
        // eslint-disable-next-line quotes
        await interaction.editReply({ content: `Data created! Please run this command again!`, ephemeral: true });
}
	}
    if (interaction.commandName === 'page3') {

       try {
		const modal = new ModalBuilder()
			.setCustomId('myModal2')
			.setTitle('Form 3');

        const moneyInput = new TextInputBuilder()
			.setCustomId('moneyInput')
			.setLabel('Money')
			.setStyle(TextInputStyle.Short)
            .setValue(`${statsThree.money}`);

        const weaponsInput = new TextInputBuilder()
			.setCustomId('weaponsInput')
			.setLabel('Weapons')
			.setStyle(TextInputStyle.Paragraph)
            .setValue(`${statsThree.weapons}`);

        const armorInput = new TextInputBuilder()
			.setCustomId('armorInput')
			.setLabel('Armor')
			.setStyle(TextInputStyle.Paragraph)
            .setValue(`${statsThree.armor}`);

        const popularityInput = new TextInputBuilder()
			.setCustomId('popularityInput')
			.setLabel('Popularity')
			.setStyle(TextInputStyle.Short)
            .setValue(`${statsThree.popularity}`);

        const itemsInput = new TextInputBuilder()
			.setCustomId('itemsInput')
			.setLabel('Items')
			.setStyle(TextInputStyle.Paragraph)
            .setValue(`${statsThree.items}`);

		// An action row only holds one text input,
		// so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(moneyInput);
        const secondActionRow = new ActionRowBuilder().addComponents(weaponsInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(armorInput);
        const fourthActionRow = new ActionRowBuilder().addComponents(popularityInput);
        const fifthActionRow = new ActionRowBuilder().addComponents(itemsInput);


		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);


		// Show the modal to the user
		await interaction.showModal(modal);
    } catch (error) {
        // eslint-disable-next-line quotes
        await interaction.reply({ content: `Looks like this user doesn't have any data for this page. Give me a moment to create some!`, ephemeral: true });
        const moneyInput = 'No Data';
        const weaponsInput = 'No Data';
        const armorInput = 'No Data';
        const popularityInput = 'No Data';
        const itemsInput = 'No Data';


        dataThree[`${guildid}+${userid}`] = {
            money: moneyInput,
            weapons: weaponsInput,
            armor: armorInput,
            popularity: popularityInput,
            items: itemsInput,
        };
        fs.writeFileSync('./data3.json', JSON.stringify(dataThree, null, 4));
        // eslint-disable-next-line quotes
        await interaction.editReply({ content: `Data created! Please run this command again!`, ephemeral: true });
}
	} else if (interaction.commandName === 'stats') {
        try {
            console.log(interaction.guild.id)
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`${user}'s Stats`)
            .setAuthor({ name: 'Guild Master', url: 'https://github.com/kozmiknano' })
            .setDescription('\u200B')
            .setThumbnail(`${avatar.displayAvatarURL({ format: 'png', dynamic: true })}`)
            .addFields(
                { name: 'Level:', value: `${stats.level}`, inline:true },
                { name: 'Speed:', value: `${stats.speed}`, inline:true },
                { name: 'Health', value: `${stats.health} (Max: ${stats.maxHealth})`, inline:true },
                { name: 'Attack (Phys)', value: `${stats.attackPhys}`, inline:true },
                { name: 'Support', value: `${statsTwo.support}`, inline:true },
                { name: 'Attack (Spell/Skill)', value: `${statsTwo.attackSpellSkill}`, inline:true },
                { name: 'Defense', value: `${statsTwo.defense}`, inline:true },
                { name: 'MP', value: `${statsTwo.mp}` },
                { name: '\u200B', value: '\u200B' },
                { name: 'Current Skills', value: `${statsTwo.currentSkills}`, inline:true },
                { name: 'Money', value: `${statsThree.money}`, inline:true },
                { name: 'Weapons', value: `${statsThree.weapons}`, inline:true },
                { name: 'Armor', value: `${statsThree.armor}`, inline:true },
                { name: 'Popularity', value: `${statsThree.popularity}`, inline:true },
                { name: 'Items', value: `${statsThree.items}`, inline:true },
            )
            .setTimestamp()
            .setFooter({ text: 'Made by KozmikNano', iconURL: 'https://avatars.githubusercontent.com/u/77017394?v=4' });
            await interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
    } catch (error) {
    interaction.reply({ content: 'Looks like this user doesn\'t have any data. Please create a profile.', ephemeral: true });
 }
} else if (interaction.commandName === 'bio') {
    try {
    const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${user}'s Character`)
        .setAuthor({ name: 'Guild Master', url: 'https://github.com/kozmiknano' })
        .setDescription('\u200B')
        .setThumbnail(`${avatar.displayAvatarURL({ format: 'png', dynamic: true })}`)
        .addFields(
            { name: 'Name:', value: `${bio.name}`, inline:true },
            { name: 'Type:', value: `${bio.type}`, inline:true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Weapons and Armor', value: `${bio.weapons}`, inline:true },
            { name: 'Abilities', value: `${bio.abilities}`, inline:true },
            { name: 'Other Info', value: `${bio.other}`},
        )
        .setTimestamp()
        .setFooter({ text: 'Made by KozmikNano', iconURL: 'https://avatars.githubusercontent.com/u/77017394?v=4' });
        await interaction.reply({ embeds: [exampleEmbed], ephemeral: false });
} catch (error) {
interaction.reply({ content: 'Looks like this user doesn\'t have any data. Please create a profile.', ephemeral: true });
}
}
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isModalSubmit()) return;
    // const userid = (interaction.options.getUser('input')).id;

    const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    const dataTwo = JSON.parse(fs.readFileSync('./data2.json', 'utf8'));
    const dataThree = JSON.parse(fs.readFileSync('./data3.json', 'utf8'));
    const bioSave = JSON.parse(fs.readFileSync('./bio.json', 'utf8'));
    const bio = (bioSave[`${guildid}+${userid}`]);

    if (interaction.customId === 'myModal') {
		await interaction.reply({ content: 'Your submission was received successfully!', ephemeral: true });


        // Try to Collect modal data and fill in blank ones with "N/A"
        const levelInput = interaction.fields.getTextInputValue('levelInput') || 'N/A';
        const speedInput = interaction.fields.getTextInputValue('speedInput') || 'N/A';
        const healthInput = interaction.fields.getTextInputValue('healthInput') || 'N/A';
        const maxHealthInput = interaction.fields.getTextInputValue('maxHealthInput') || 'N/A';
        const attackPhysInput = interaction.fields.getTextInputValue('attackPhysInput') || 'N/A';


        data[`${guildid}+${userid}`] = {
            level: levelInput,
            speed: speedInput,
            health: healthInput,
            maxHealth: maxHealthInput,
            attackPhys: attackPhysInput,
        };
        fs.writeFileSync('./data.json', JSON.stringify(data, null, 4));

    } else if (interaction.customId === 'myModal1') {
		await interaction.reply({ content: 'Your submission was received successfully!', ephemeral: true });


        // Try to Collect modal data and fill in blank ones with "N/A"
        // const levelInput = interaction.fields.getTextInputValue('levelInput') || 'N/A';
        // const speedInput = interaction.fields.getTextInputValue('speedInput') || 'N/A';
        // const healthInput = interaction.fields.getTextInputValue('healthInput') || 'N/A';
        // const maxHealthInput = interaction.fields.getTextInputValue('maxHealthInput') || 'N/A';
        // const attackPhysInput = interaction.fields.getTextInputValue('attackPhysInput') || 'N/A';
        const supportInput = interaction.fields.getTextInputValue('supportInput') || 'N/A';
        const attackSpellSkillInput = interaction.fields.getTextInputValue('attackSpellSkillInput') || 'N/A';
        const defenseInput = interaction.fields.getTextInputValue('defenseInput') || 'N/A';
        const mpInput = interaction.fields.getTextInputValue('mpInput') || 'N/A';
        const currentSkillsInput = interaction.fields.getTextInputValue('currentSkillsInput') || 'N/A';

        // const moneyInput = interaction.fields.getTextInputValue('moneyInput') || 'N/A';
        // const weaponsInput = interaction.fields.getTextInputValue('weaponsInput') || 'N/A';
        // const armorInput = interaction.fields.getTextInputValue('armorInput') || 'N/A';
        // const popularityInput = interaction.fields.getTextInputValue('popularityInput') || 'N/A';
        // const itemsInput = interaction.fields.getTextInputValue('itemsInput') || 'N/A';


        // Save data to json file (replace data if it already exists, and keep old data if it doesn't)
        dataTwo[`${guildid}+${userid}`] = {
            support: supportInput,
            attackSpellSkill: attackSpellSkillInput,
            defense: defenseInput,
            mp: mpInput,
            currentSkills: currentSkillsInput,
        };
        fs.writeFileSync('./data2.json', JSON.stringify(dataTwo, null, 4));

    } else if (interaction.customId === 'myModal2') {
		await interaction.reply({ content: 'Your submission was received successfully!', ephemeral: true });


        // Try to Collect modal data and fill in blank ones with "N/A"
        // const levelInput = interaction.fields.getTextInputValue('levelInput') || 'N/A';
        // const speedInput = interaction.fields.getTextInputValue('speedInput') || 'N/A';
        // const healthInput = interaction.fields.getTextInputValue('healthInput') || 'N/A';
        // const maxHealthInput = interaction.fields.getTextInputValue('maxHealthInput') || 'N/A';
        // const attackPhysInput = interaction.fields.getTextInputValue('attackPhysInput') || 'N/A';
        // const supportInput = interaction.fields.getTextInputValue('supportInput') || 'N/A';
        // const attackSpellSkillInput = interaction.fields.getTextInputValue('attackSpellSkillInput') || 'N/A';
        // const defenseInput = interaction.fields.getTextInputValue('defenseInput') || 'N/A';
        // const mpInput = interaction.fields.getTextInputValue('mpInput') || 'N/A';
        // const currentSkillsInput = interaction.fields.getTextInputValue('currentSkillsInput') || 'N/A';

        const moneyInput = interaction.fields.getTextInputValue('moneyInput') || 'N/A';
        const weaponsInput = interaction.fields.getTextInputValue('weaponsInput') || 'N/A';
        const armorInput = interaction.fields.getTextInputValue('armorInput') || 'N/A';
        const popularityInput = interaction.fields.getTextInputValue('popularityInput') || 'N/A';
        const itemsInput = interaction.fields.getTextInputValue('itemsInput') || 'N/A';


        // Save data to json file (replace data if it already exists, and keep old data if it doesn't)
        dataThree[`${guildid}+${userid}`] = {
            money: moneyInput,
            weapons: weaponsInput,
            armor: armorInput,
            popularity: popularityInput,
            items: itemsInput,
        };
        fs.writeFileSync('./data3.json', JSON.stringify(dataThree, null, 4));

    } else if (interaction.customId === 'bio') {
		await interaction.reply({ content: 'Your submission was received successfully!', ephemeral: true });


        // Try to Collect modal data and fill in blank ones with "N/A"
        // const levelInput = interaction.fields.getTextInputValue('levelInput') || 'N/A';
        // const speedInput = interaction.fields.getTextInputValue('speedInput') || 'N/A';
        // const healthInput = interaction.fields.getTextInputValue('healthInput') || 'N/A';
        // const maxHealthInput = interaction.fields.getTextInputValue('maxHealthInput') || 'N/A';
        // const attackPhysInput = interaction.fields.getTextInputValue('attackPhysInput') || 'N/A';
        // const supportInput = interaction.fields.getTextInputValue('supportInput') || 'N/A';
        // const attackSpellSkillInput = interaction.fields.getTextInputValue('attackSpellSkillInput') || 'N/A';
        // const defenseInput = interaction.fields.getTextInputValue('defenseInput') || 'N/A';
        // const mpInput = interaction.fields.getTextInputValue('mpInput') || 'N/A';
        // const currentSkillsInput = interaction.fields.getTextInputValue('currentSkillsInput') || 'N/A';

        // const moneyInput = interaction.fields.getTextInputValue('moneyInput') || 'N/A';
        // const weaponsInput = interaction.fields.getTextInputValue('weaponsInput') || 'N/A';
        // const armorInput = interaction.fields.getTextInputValue('armorInput') || 'N/A';
        // const popularityInput = interaction.fields.getTextInputValue('popularityInput') || 'N/A';
        // const itemsInput = interaction.fields.getTextInputValue('itemsInput') || 'N/A';
        
        const nameInput = interaction.fields.getTextInputValue('nameInput') || 'N/A';
        const typeInput = interaction.fields.getTextInputValue('typeInput') || 'N/A';
        const weaponsInput = interaction.fields.getTextInputValue('weaponsInput') || 'N/A';
        const abilitiesInput = interaction.fields.getTextInputValue('abilitiesInput') || 'N/A';
        const otherInput = interaction.fields.getTextInputValue('otherInput') || 'N/A';


        // Save data to json file (replace data if it already exists, and keep old data if it doesn't)
        bioSave[`${guildid}+${userid}`] = {
            name: nameInput,
            type: typeInput,
            weapons: weaponsInput,
            abilities: abilitiesInput,
            other: otherInput,
        };
        fs.writeFileSync('./bio.json', JSON.stringify(bioSave, null, 4));

    }


});
        // // Yes I know this is a bad way to do this, but I am lazy.


// Sample Data

// Level 1
// Speed: 5
// Health: 13 (MAX 1234)
// Attack (Phys): 10
// Support: 20
// Attack (Spell/Skill): 14
// Defense: 6
// MP: 17

// Current Skills: Lifeup alpha (Heals one person by 20 hp),(4MP) Life up beta (Heals one person by 40 HP)(10 MP), Party heal (heals party by 20) (20 MP)
// Money: 25g
// Weapons: Staff (+1 phys +1 spell)
// Armor: Funny Looking Robe (+1 defense)
// Popularity: 2
// Items: Potions 5


client.login(token);