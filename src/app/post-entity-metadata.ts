import { EntityDataModuleConfig, EntityMetadataMap } from "@ngrx/data";


export const entityMetadata: EntityMetadataMap = {
    Post: {
        entityDispatcherOptions: {
            optimisticUpdate: true,
            optimisticDelete: true,
            optimisticAdd: false,
        }
    },
} 

export const entityConfig: EntityDataModuleConfig = {
    entityMetadata,
}