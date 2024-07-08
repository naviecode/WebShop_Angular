export interface IUiAction<TList>
{
    onAdd() : void;
    onUpdate(item : TList) : void;
    onEdit(item: TList): void;
    onDelete(item : TList) : void;
    onSave() : void;
    onSearch() : void;
}