import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'RascusMU/progressivo',
  },
  ui: {
    brand: { name: 'Progressivo CMS' },
    navigation: {
      'Content': ['blog', 'services', 'about'],
    },
  },
  collections: {
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*/',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        lang: fields.select({
          label: 'Language',
          options: [
            { label: 'Czech', value: 'cs' },
            { label: 'English', value: 'en' },
            { label: 'German', value: 'de' },
            { label: 'Spanish', value: 'es' },
            { label: 'Russian', value: 'ru' },
          ],
          defaultValue: 'cs',
        }),
        perex: fields.text({ label: 'Perex/Description', multiline: true }),
        date: fields.date({ label: 'Date' }),
        coverImage: fields.image({
            label: 'Cover Image',
            directory: 'public/images/blog',
            publicPath: '/images/blog/',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    services: collection({
      label: 'Služby',
      slugField: 'name',
      path: 'src/content/services/**',
      format: { contentField: 'content' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        lang: fields.select({
            label: 'Language',
            options: [
              { label: 'Czech', value: 'cs' },
              { label: 'English', value: 'en' },
              { label: 'German', value: 'de' },
              { label: 'Spanish', value: 'es' },
              { label: 'Russian', value: 'ru' },
            ],
            defaultValue: 'cs',
        }),
        icon: fields.text({ label: 'Icon Name' }),
        image: fields.image({
             label: 'Image',
             directory: 'public/images/services',
             publicPath: '/images/services/',
        }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
  singletons: {
    about: singleton({
      label: 'O nás',
      path: 'src/content/pages/about/index',
      format: 'json',
      schema: {
        cs: fields.object({
            hero: fields.object({
                title: fields.text({ label: 'Hero Title' }),
                perex: fields.text({ label: 'Hero Perex', multiline: true }),
            }, { label: 'Hero' }),
            started: fields.object({
                title: fields.text({ label: 'Started Title' }),
                text: fields.array(fields.text({ multiline: true }), { label: 'Started Text' }),
            }, { label: 'Started Section' }),
            whatWeDo: fields.object({
                title: fields.text({ label: 'What We Do Title' }),
                perex: fields.text({ label: 'Perex', multiline: true }),
                items: fields.array(
                    fields.object({
                        title: fields.text({ label: 'Title' }),
                        desc: fields.text({ label: 'Description', multiline: true }),
                        target: fields.text({ label: 'Target Audience' }),
                    }),
                    { label: 'Items', itemLabel: props => props.title }
                ),
            }, { label: 'What We Do' }),
            why: fields.object({
                title: fields.text({ label: 'Why Title' }),
                text: fields.array(fields.text({ multiline: true }), { label: 'Text' }),
            }, { label: 'Why' }),
            how: fields.object({
                title: fields.text({ label: 'How Title' }),
                items: fields.array(
                    fields.object({
                        title: fields.text({ label: 'Title' }),
                        desc: fields.text({ label: 'Description', multiline: true }),
                    }),
                    { label: 'Items', itemLabel: props => props.title }
                ),
            }, { label: 'How' }),
            network: fields.object({
                title: fields.text({ label: 'Network Title' }),
                perex: fields.text({ label: 'Perex', multiline: true }),
                items: fields.array(
                    fields.object({
                        name: fields.text({ label: 'Name' }),
                        desc: fields.text({ label: 'Description' }),
                    }),
                    { label: 'Items', itemLabel: props => props.name }
                ),
                conclusion: fields.text({ label: 'Conclusion' }),
            }, { label: 'Network' }),
            founder: fields.object({
                name: fields.text({ label: 'Name' }),
                role: fields.text({ label: 'Role' }),
                text: fields.array(fields.text({ multiline: true }), { label: 'Text' }),
                quote: fields.text({ label: 'Quote', multiline: true }),
            }, { label: 'Founder' }),
            testimonials: fields.object({
                title: fields.text({ label: 'Title' }),
                items: fields.array(
                    fields.object({
                        text: fields.text({ label: 'Text', multiline: true }),
                        author: fields.text({ label: 'Author' }),
                    }),
                    { label: 'Items', itemLabel: props => props.author }
                ),
            }, { label: 'Testimonials' }),
            cta: fields.object({
                title: fields.text({ label: 'Title' }),
                text: fields.text({ label: 'Text', multiline: true }),
                button: fields.text({ label: 'Button Text' }),
                whatsapp: fields.text({ label: 'WhatsApp Text' }),
            }, { label: 'CTA' }),
        }, { label: 'Czech (CS)' }),
        // For other languages, using similar structure or placeholders.
        // Since schema must match JSON exactly, I'll add them as well.
        en: fields.object({
            hero: fields.object({
                title: fields.text({ label: 'Hero Title' }),
                perex: fields.text({ label: 'Hero Perex', multiline: true }),
            }, { label: 'Hero' }),
            started: fields.object({
                title: fields.text({ label: 'Started Title' }),
                text: fields.array(fields.text({ multiline: true }), { label: 'Started Text' }),
            }, { label: 'Started Section' }),
            whatWeDo: fields.object({
                title: fields.text({ label: 'What We Do Title' }),
                perex: fields.text({ label: 'Perex', multiline: true }),
                items: fields.array(
                    fields.object({
                        title: fields.text({ label: 'Title' }),
                        desc: fields.text({ label: 'Description', multiline: true }),
                        target: fields.text({ label: 'Target Audience' }), // Assuming structure match even if empty in TS
                    }),
                    { label: 'Items', itemLabel: props => props.title }
                ),
            }, { label: 'What We Do' }),
            why: fields.object({
                title: fields.text({ label: 'Why Title' }),
                text: fields.array(fields.text({ multiline: true }), { label: 'Text' }),
            }, { label: 'Why' }),
            how: fields.object({
                title: fields.text({ label: 'How Title' }),
                items: fields.array(
                    fields.object({
                        title: fields.text({ label: 'Title' }),
                        desc: fields.text({ label: 'Description', multiline: true }),
                    }),
                    { label: 'Items', itemLabel: props => props.title }
                ),
            }, { label: 'How' }),
            network: fields.object({
                title: fields.text({ label: 'Network Title' }),
                perex: fields.text({ label: 'Perex', multiline: true }),
                items: fields.array(
                    fields.object({
                        name: fields.text({ label: 'Name' }),
                        desc: fields.text({ label: 'Description' }),
                    }),
                    { label: 'Items', itemLabel: props => props.name }
                ),
                conclusion: fields.text({ label: 'Conclusion' }),
            }, { label: 'Network' }),
            founder: fields.object({
                name: fields.text({ label: 'Name' }),
                role: fields.text({ label: 'Role' }),
                text: fields.array(fields.text({ multiline: true }), { label: 'Text' }),
                quote: fields.text({ label: 'Quote', multiline: true }),
            }, { label: 'Founder' }),
            testimonials: fields.object({
                title: fields.text({ label: 'Title' }),
                items: fields.array(
                    fields.object({
                        text: fields.text({ label: 'Text', multiline: true }),
                        author: fields.text({ label: 'Author' }),
                    }),
                    { label: 'Items', itemLabel: props => props.author }
                ),
            }, { label: 'Testimonials' }),
            cta: fields.object({
                title: fields.text({ label: 'Title' }),
                text: fields.text({ label: 'Text', multiline: true }),
                button: fields.text({ label: 'Button Text' }),
                whatsapp: fields.text({ label: 'WhatsApp Text' }),
            }, { label: 'CTA' }),
        }, { label: 'English (EN)' }),
        // ... Repeated for de, es, ru.
        // For brevity in this turn, I will implement CS and EN fully and assume others are similar or can be added by user.
        // But strict schema validation might fail if I don't include them and they exist in JSON.
        // I will add them with basic structure or similar to EN.
        de: fields.object({
             hero: fields.object({ title: fields.text({ label: 'Title' }), perex: fields.text({ label: 'Perex', multiline: true }) }, { label: 'Hero' }),
             // ... minimal schema to match JSON structure to avoid errors
             // Actually Keystatic allows extra fields in JSON if not defined in schema? No, it usually strips them on save.
             // So I MUST define all fields if I want to preserve them.
             // Given the time/token limit, I will duplicate the structure.
             started: fields.object({ title: fields.text({ label: 'Title' }), text: fields.array(fields.text({ multiline: true }), { label: 'Text' }) }, { label: 'Started' }),
             whatWeDo: fields.object({ title: fields.text({ label: 'Title' }), perex: fields.text({ label: 'Perex', multiline: true }), items: fields.array(fields.object({ title: fields.text({ label: 'Title' }), desc: fields.text({ label: 'Desc', multiline: true }), target: fields.text({ label: 'Target' }) }), { label: 'Items' }) }, { label: 'What We Do' }),
             why: fields.object({ title: fields.text({ label: 'Title' }), text: fields.array(fields.text({ multiline: true }), { label: 'Text' }) }, { label: 'Why' }),
             how: fields.object({ title: fields.text({ label: 'Title' }), items: fields.array(fields.object({ title: fields.text({ label: 'Title' }), desc: fields.text({ label: 'Desc', multiline: true }) }), { label: 'Items' }) }, { label: 'How' }),
             network: fields.object({ title: fields.text({ label: 'Title' }), perex: fields.text({ label: 'Perex', multiline: true }), items: fields.array(fields.object({ name: fields.text({ label: 'Name' }), desc: fields.text({ label: 'Desc' }) }), { label: 'Items' }), conclusion: fields.text({ label: 'Conclusion' }) }, { label: 'Network' }),
             founder: fields.object({ name: fields.text({ label: 'Name' }), role: fields.text({ label: 'Role' }), text: fields.array(fields.text({ multiline: true }), { label: 'Text' }), quote: fields.text({ label: 'Quote', multiline: true }) }, { label: 'Founder' }),
             testimonials: fields.object({ title: fields.text({ label: 'Title' }), items: fields.array(fields.object({ text: fields.text({ label: 'Text', multiline: true }), author: fields.text({ label: 'Author' }) }), { label: 'Items' }) }, { label: 'Testimonials' }),
             cta: fields.object({ title: fields.text({ label: 'Title' }), text: fields.text({ label: 'Text', multiline: true }), button: fields.text({ label: 'Button' }), whatsapp: fields.text({ label: 'WhatsApp' }) }, { label: 'CTA' }),
        }, { label: 'German (DE)' }),
        es: fields.object({
             hero: fields.object({ title: fields.text({ label: 'Title' }), perex: fields.text({ label: 'Perex', multiline: true }) }, { label: 'Hero' }),
             started: fields.object({ title: fields.text({ label: 'Title' }), text: fields.array(fields.text({ multiline: true }), { label: 'Text' }) }, { label: 'Started' }),
             whatWeDo: fields.object({ title: fields.text({ label: 'Title' }), perex: fields.text({ label: 'Perex', multiline: true }), items: fields.array(fields.object({ title: fields.text({ label: 'Title' }), desc: fields.text({ label: 'Desc', multiline: true }), target: fields.text({ label: 'Target' }) }), { label: 'Items' }) }, { label: 'What We Do' }),
             why: fields.object({ title: fields.text({ label: 'Title' }), text: fields.array(fields.text({ multiline: true }), { label: 'Text' }) }, { label: 'Why' }),
             how: fields.object({ title: fields.text({ label: 'Title' }), items: fields.array(fields.object({ title: fields.text({ label: 'Title' }), desc: fields.text({ label: 'Desc', multiline: true }) }), { label: 'Items' }) }, { label: 'How' }),
             network: fields.object({ title: fields.text({ label: 'Title' }), perex: fields.text({ label: 'Perex', multiline: true }), items: fields.array(fields.object({ name: fields.text({ label: 'Name' }), desc: fields.text({ label: 'Desc' }) }), { label: 'Items' }), conclusion: fields.text({ label: 'Conclusion' }) }, { label: 'Network' }),
             founder: fields.object({ name: fields.text({ label: 'Name' }), role: fields.text({ label: 'Role' }), text: fields.array(fields.text({ multiline: true }), { label: 'Text' }), quote: fields.text({ label: 'Quote', multiline: true }) }, { label: 'Founder' }),
             testimonials: fields.object({ title: fields.text({ label: 'Title' }), items: fields.array(fields.object({ text: fields.text({ label: 'Text', multiline: true }), author: fields.text({ label: 'Author' }) }), { label: 'Items' }) }, { label: 'Testimonials' }),
             cta: fields.object({ title: fields.text({ label: 'Title' }), text: fields.text({ label: 'Text', multiline: true }), button: fields.text({ label: 'Button' }), whatsapp: fields.text({ label: 'WhatsApp' }) }, { label: 'CTA' }),
        }, { label: 'Spanish (ES)' }),
        ru: fields.object({
             hero: fields.object({ title: fields.text({ label: 'Title' }), perex: fields.text({ label: 'Perex', multiline: true }) }, { label: 'Hero' }),
             started: fields.object({ title: fields.text({ label: 'Title' }), text: fields.array(fields.text({ multiline: true }), { label: 'Text' }) }, { label: 'Started' }),
             whatWeDo: fields.object({ title: fields.text({ label: 'Title' }), perex: fields.text({ label: 'Perex', multiline: true }), items: fields.array(fields.object({ title: fields.text({ label: 'Title' }), desc: fields.text({ label: 'Desc', multiline: true }), target: fields.text({ label: 'Target' }) }), { label: 'Items' }) }, { label: 'What We Do' }),
             why: fields.object({ title: fields.text({ label: 'Title' }), text: fields.array(fields.text({ multiline: true }), { label: 'Text' }) }, { label: 'Why' }),
             how: fields.object({ title: fields.text({ label: 'Title' }), items: fields.array(fields.object({ title: fields.text({ label: 'Title' }), desc: fields.text({ label: 'Desc', multiline: true }) }), { label: 'Items' }) }, { label: 'How' }),
             network: fields.object({ title: fields.text({ label: 'Title' }), perex: fields.text({ label: 'Perex', multiline: true }), items: fields.array(fields.object({ name: fields.text({ label: 'Name' }), desc: fields.text({ label: 'Desc' }) }), { label: 'Items' }), conclusion: fields.text({ label: 'Conclusion' }) }, { label: 'Network' }),
             founder: fields.object({ name: fields.text({ label: 'Name' }), role: fields.text({ label: 'Role' }), text: fields.array(fields.text({ multiline: true }), { label: 'Text' }), quote: fields.text({ label: 'Quote', multiline: true }) }, { label: 'Founder' }),
             testimonials: fields.object({ title: fields.text({ label: 'Title' }), items: fields.array(fields.object({ text: fields.text({ label: 'Text', multiline: true }), author: fields.text({ label: 'Author' }) }), { label: 'Items' }) }, { label: 'Testimonials' }),
             cta: fields.object({ title: fields.text({ label: 'Title' }), text: fields.text({ label: 'Text', multiline: true }), button: fields.text({ label: 'Button' }), whatsapp: fields.text({ label: 'WhatsApp' }) }, { label: 'CTA' }),
        }, { label: 'Russian (RU)' }),
      },
    }),
  },
});
