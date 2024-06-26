import { AllowedBadgeLabel } from '../projects/project';
import { database } from '../services/db';

const allowedBadgeLabels: AllowedBadgeLabel[] = [
  'api platform',
  'docker',
  'javascript',
  'next js',
  'php',
  'react js',
  'symfony',
  'tailwind',
  'typescript',
  'vite',
];

export class ProjectSchema {
  public static schema = {
    $jsonSchema: {
      bsonType: 'object',
      required: ['technos', 'title', 'description', 'img', 'link', 'gitLink'],
      properties: {
        _id: {
          bsonType: 'objectId',
          description: 'Auto generated id',
        },
        technos: {
          bsonType: 'array',
          items: {
            bsonType: 'string',
            enum: Object.values(allowedBadgeLabels),
          },
        },
        title: {
          bsonType: 'string',
        },
        description: {
          bsonType: 'array',
          items: {
            bsonType: 'string',
          },
        },
        img: {
          bsonType: 'string',
        },
        link: {
          bsonType: 'string',
        },
        gitLink: {
          bsonType: 'string',
        },
      },
    },
  };

  static async applyToCollection(): Promise<void> {
    await database.command({
      collMod: 'Projects',
      validator: ProjectSchema.schema
    }); 
  }

  // static async dumpFromCollection(): Promise<void> {
  //     const options = await projectsCollection.options();
  //     console.log('projectSchema :');
  //     console.dir(options.validator, { depth: null });
  // }
}

export const projectsCollection = database.collection('Projects')