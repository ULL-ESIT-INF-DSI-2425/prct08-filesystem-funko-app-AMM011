import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { UserFunkoManager } from './storage/UserFunkoManager.js';
import { Funko } from './models/Funko.js';
import { FunkoType } from './models/FunkoType.js';
import { FunkoGenre } from './models/FunkoGenre.js';
import chalk from 'chalk';

/**
 * Configuración de comandos para la aplicación CLI de gestión de Funkos.
 */
yargs(hideBin(process.argv))
  .command(
    'add',
    'Añade un nuevo Funko',
    {
      user: { type: 'string', demandOption: true, describe: 'Nombre de usuario' },
      id: { type: 'number', demandOption: true },
      name: { type: 'string', demandOption: true },
      desc: { type: 'string', demandOption: true },
      type: { type: 'string', choices: Object.values(FunkoType), demandOption: true },
      genre: { type: 'string', choices: Object.values(FunkoGenre), demandOption: true },
      franchise: { type: 'string', demandOption: true },
      number: { type: 'number', demandOption: true },
      exclusive: { type: 'boolean', default: false },
      features: { type: 'string', demandOption: true },
      value: { type: 'number', demandOption: true }
    },
    async (argv) => {
      const manager = new UserFunkoManager(argv.user);
      await manager.load();

      const funko = new Funko(
        argv.id,
        argv.name,
        argv.desc,
        argv.type as FunkoType,
        argv.genre as FunkoGenre,
        argv.franchise,
        argv.number,
        argv.exclusive,
        argv.features,
        argv.value
      );

      const success = await manager.add(funko);
      if (success) {
        console.log(chalk.green(`✅ Funko añadido a la colección de ${argv.user}.`));
      } else {
        console.log(chalk.red(`❌ Ya existe un Funko con ID ${argv.id} en la colección de ${argv.user}.`));
      }
    }
  )
  .command(
    'update',
    'Modifica un Funko existente',
    {
      user: { type: 'string', demandOption: true, describe: 'Nombre de usuario' },
      id: { type: 'number', demandOption: true },
      name: { type: 'string', demandOption: true },
      desc: { type: 'string', demandOption: true },
      type: { type: 'string', choices: Object.values(FunkoType), demandOption: true },
      genre: { type: 'string', choices: Object.values(FunkoGenre), demandOption: true },
      franchise: { type: 'string', demandOption: true },
      number: { type: 'number', demandOption: true },
      exclusive: { type: 'boolean', default: false },
      features: { type: 'string', demandOption: true },
      value: { type: 'number', demandOption: true }
    },
    async (argv) => {
      const manager = new UserFunkoManager(argv.user);
      await manager.load();
  
      const funko = new Funko(
        argv.id,
        argv.name,
        argv.desc,
        argv.type as FunkoType,
        argv.genre as FunkoGenre,
        argv.franchise,
        argv.number,
        argv.exclusive,
        argv.features,
        argv.value
      );
  
      const success = await manager.update(funko);
      if (success) {
        console.log(chalk.green(`✅ Funko actualizado correctamente en la colección de ${argv.user}.`));
      } else {
        console.log(chalk.red(`❌ No se encontró el Funko con ID ${argv.id} en la colección de ${argv.user}.`));
      }
    }
  )  
  .command(
    'remove',
    'Elimina un Funko por su ID',
    {
        user: { type: 'string', demandOption: true, describe: 'Nombre de usuario' },
        id: { type: 'number', demandOption: true, describe: 'ID del Funko a eliminar' }
    },
    async (argv) => {
        const manager = new UserFunkoManager(argv.user);
        await manager.load();

        const success = await manager.remove(argv.id);
        if (success) {
            console.log(chalk.green(`🗑️ Funko con ID ${argv.id} eliminado de la colección de ${argv.user}.`));
        } else {
            console.log(chalk.red(`❌ No se encontró el Funko con ID ${argv.id} en la colección de ${argv.user}.`));
        }
    }
  )
  .help()
  .parse();
