export const loadTranslations = async (locale: string) => {
  const url = `https://api.i18nexus.com/project_resources/translations/${locale}.json?api_key=${process.env.I18NEXUS_API_KEY}`

  const res = await fetch(url, {
    next: { revalidate: false },
  })

  return res.json()
}
