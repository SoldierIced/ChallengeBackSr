export function StringToSlug(value: string, length: number | null = null): string {
    let slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    if (length !== null && slug.length > length) {
        slug = StringLimitCharacters(slug, length);
    }
    return slug;
}

export function StringLimitCharacters(text: string, length: number): string {
    return text.substring(0, length).replace(/-+$/, '');
}
