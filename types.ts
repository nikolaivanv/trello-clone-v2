import { Attachment, Card, List } from '@prisma/client';

export type ListWithCards = List & { cards: Card[]};

export type CardWithList = Card & { list: List} & { attachments: Attachment[]};