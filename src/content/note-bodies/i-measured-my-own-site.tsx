import { P, H2, H3, Code, Pull, MetricBand, Callout, Figure } from '@/components/notes/Prose';

export default function Body() {
  return (
    <>
      <P>
        The site I am proudest of is a safari site. Forty-odd photographs of Uganda, a lioness carrying her cub across the
        hero, gorillas in the mist at Bwindi. It looks the way a safari site should look. I built it on my own, start to
        finish, and every time I open it on my laptop it snaps into place in about a second.
      </P>
      <P>Last week I opened it on the connection I actually have, and watched a grey rectangle where the lioness was supposed to be.</P>
      <P>Not for a moment. For most of a minute.</P>

      <H2>What I actually measured</H2>
      <P>
        I stopped guessing and opened the performance panel. Here is the homepage, loaded cold, on a connection the browser
        itself described as 3G. That is 1.3 Mbps down with a 650 ms round trip. Not a worst case I invented for drama. That
        is my desk.
      </P>
      <MetricBand
        items={[
          { value: '4.25 MB', label: 'Transferred' },
          { value: '34', label: 'Images' },
          { value: '15', label: 'Missing at 4 min' },
          { value: '943 KB', label: 'Largest file' },
        ]}
      />
      <P>
        The one that stung was a 227 KB image that took <strong>66 seconds</strong> to arrive. 227 KB is not a big file. It
        took a minute because it was queued behind everything else, waiting its turn on a pipe that was already full.
      </P>
      <Figure
        placeholder='SCREENSHOT · DevTools network waterfall, Slow 4G, cache disabled'
        caption='The waterfall is the whole argument. Everything after this is explanation.'
      />
      <P>
        I want to be precise about what this means, because &ldquo;the site is slow&rdquo; is not useful. The text arrives
        fine. The layout arrives fine. Someone on my connection sees a complete, working page in about five seconds, with
        grey boxes where the photographs should be, and those boxes fill in one at a time over the following four minutes.
        On a safari site, where the photographs <em>are</em> the product, that is close to the same thing as the site not
        working.
      </P>
      <Pull>Looking fine is a very effective way of not being checked.</Pull>

      <H2>Three causes, all mine</H2>
      <H3>Photographs saved as PNG</H3>
      <P>
        This is the big one and it is embarrassing, because it is the first thing anyone would tell you. PNG is lossless. It
        is built for screenshots, logos, and anything with flat colour and hard edges. A photograph of grass has no flat
        colour and no hard edges, so PNG stores every blade honestly and charges you for it.
      </P>
      <H3>A ten-slide carousel that wants all ten slides now</H3>
      <P>
        The visitor sees the first, possibly the second before scrolling away, but the browser fetches all of them at once
        and every request competes with the images further down the page. That is why a 227 KB file took over a minute. It
        was not slow. It was fifteenth in line.
      </P>
      <P>
        I had put <Code>loading=&quot;eager&quot;</Code> on every slide, deliberately, because I wanted to kill the blur on
        first load. The fix for a slow first image turned out to be giving it nine competitors.
      </P>
      <H3>Asking for 3840-pixel images on a 1366-pixel screen</H3>
      <P>
        Next.js serves whatever width you ask for. I asked for <Code>w=3840</Code> out of a vague instinct that bigger is
        safer for retina displays. Nobody looking at that page can see the difference. Everybody pays for it.
      </P>

      <H2>Why I did not notice for a year</H2>
      <P>
        I built the site on my laptop, over office wifi, with a warm cache, on a 1366-pixel screen where everything already
        looked right. Every one of those conditions is a lie about my visitors. By the second day of a project my browser has
        cached everything and I stop seeing the first load entirely. I only ever see the site as someone who has already been
        there.
      </P>
      <P>
        I knew this. I have said it in interviews. I put &ldquo;performance&rdquo; on my CV. I still did not open the network
        tab on my own site for a year.
      </P>

      <H2>What I am changing</H2>
      <ul className='mb-6.5 ml-5.5 list-disc'>
        <li className='mb-2.5'>Every photograph resized and re-encoded, with AVIF served to browsers that support it and the original format kept as the fallback</li>
        <li className='mb-2.5'>Requested widths capped, so a 3840-pixel hero is never generated</li>
        <li className='mb-2.5'>The carousel cut from ten slides to four, mounted progressively, with <Code>priority</Code> on the first</li>
        <li className='mb-2.5'>A budget written down: under 1.5 MB for the homepage, largest contentful paint under four seconds on a 3G profile</li>
      </ul>

      <Callout title='If you take one thing from this'>
        Chrome can fake a bad connection for you. Network throttling, CPU slowdown, and the checkbox that disables cache so
        you see the first visit instead of the fifth. It takes ten seconds to turn on. I now leave it on for the last hour of
        every project, and I do not send a handover email until I have watched the site load once, cold and throttled, as a
        stranger would.
      </Callout>

      <P>The site still looks the way a safari site should look. It just needs to arrive.</P>
      <P>
        <em>
          I will write a follow-up once the changes are live, with the same measurements taken the same way. If the numbers
          do not move, I would rather publish that than quietly delete this post.
        </em>
      </P>
    </>
  );
}
