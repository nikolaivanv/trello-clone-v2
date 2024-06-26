"use client";

import { useQuery } from '@tanstack/react-query';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Header } from './header';
import { useCardModal } from '@/hooks/use-card-modal';
import { CardWithList } from '@/types';
import { fetcher } from '@/lib/fetcher';
import { Description } from './description';
import { Activity } from './activity';
import { Actions } from './actions';
import { AuditLog } from '@prisma/client';
import { Attachments } from './attachment';


export const CardModal = () => {
    const id = useCardModal((state) => state.id);
    const isOpen = useCardModal((state) => state.isOpen);
    const onOpen = useCardModal((state) => state.onOpen);
    const onClose = useCardModal((state) => state.onClose);

    const { data: cardData } = useQuery<CardWithList>({
        queryKey: ['card', id],
        queryFn: () => fetcher(`/api/cards/${id}`),
    }); 

    const { data: auditLogsData } = useQuery<AuditLog[]>({
        queryKey: ['card-logs', id],
        queryFn: () => fetcher(`/api/cards/${id}/logs`),
    }); 

    if(!cardData) return null;

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                {!cardData 
                    ? <Header.Skeleton />
                    : <Header data={cardData} />
                }
                <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
                    <div className="col-span-3">
                        <div className="w-full space-y-6">
                            {!cardData 
                                ? <Description.Skeleton />
                                : <Description data={cardData} />
                            }
                            <Attachments attachments={cardData.attachments}/>
                            {!auditLogsData 
                                ? <Activity.Skeleton />
                                : <Activity card={cardData} activityItems={auditLogsData} />
                            }
                        </div>
                    </div>
                    {!cardData
                        ? <Actions.Skeleton />
                        : <Actions data={cardData}/>
                    }
                </div>
            </DialogContent>
        </Dialog>
    );
};