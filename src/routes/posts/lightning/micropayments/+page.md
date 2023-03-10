# Micropayments and the Lightning Network

_March 10, 2023_

_Content monetization on the internet is broken. Credit card fees prohibit the ability to make small payments for individual pieces of content. Creators have to choose between invading user privacy by selling their data, annoying them with a barrage of ads, or putting up paywalls and forcing them to sign up for subscriptions to continue. The Lightning Network offers a new, alternative monetization strategy in the form of micropayments._

## Before Bitcoin

Before the World Wide Web, the internet, or even the personal computer revolution, the concept of making tiny payments in exchange for digital content had already been conceptualized. The term “micropayment” can be traced back to Ted Nelson as early as 1960, when he began brainstorming his ideas for what a globally accessible, computer-based repository of human knowledge could look like, and coined many other terms and ideas that are used on the web today, like “hypertext” and “hypermedia”. While often failing to implement his own vision for the web (and being vocally regretful of how the web took shape), others took many of his ideas and built them into what we know it as today.

In 1992, Tim Berners-Lee, creator of HTTP and HTML, released his [second version of HTTP](https://www.w3.org/Protocols/HTTP/HTRESP.html) and the first reference to the status codes now in common use. Among them was a code that Berners-Lee and others thought would one day be used to pay for digital content: <code>402 payment required</code>. Sadly, this status code is officially [“reserved for future use”](https://www.rfc-editor.org/rfc/rfc7231#section-6.5.2), as the various attempts to make micropayments on the web, from its inception, failed to come to fruition. Over 30 years after the invention of the internet, we’re still waiting for one of its major original visions to be fulfilled.

Berners-Lee founded the World Wide Web Consortium (W3C) in 1994 to guide the development of the web, and micropayments were a major consideration from the start. In 1995, Phillip Hallam-Baker, who wrote a number of RFCs on internet security, drafted the [Micro Payment Transfer Protocol (MPTP)](https://www.w3.org/TR/WD-mptp), which never seems to have been implemented. It offers a number of insights on the nature of micropayments that are as relevant today as they were at the founding of the internet:

> There is a large interest in payment systems which support charging relatively small amounts for a unit of information. Here the speed and cost of processing payments are critical factors in assessing a schemes usability. Fast user response is essential if the user is to be encouraged to make a large number of purchases.

A critical limitation of MPTP, however, was that a third party, referred to as a _broker_, was explicitly required by the protocol.

At the time, there was no way to make a digital payment without a trusted mediator, so any attempt at a protocol for micropayments had to be developed with some sort of custodianship of the money in mind.

The W3C continued to push for micropayments for a while, in 1998 publishing an [overview](https://www.w3.org/ECommerce/Micropayments/) of micropayments and suggesting MPTP as a practical approach and noting:

> Micropayments have to be suitable for the sale of non-tangible goods over the Internet […] With the rising importance of intangible (e.g. information) goods in global economies and their instantaneous delivery at negligible cost, "conventional" payment methods tend to be more expensive than the actual product.

This echoes Hallam-Baker’s second major concern of transaction costs imposed by technological or overhead costs of available payment mechanisms. His first concern, the need for a “fast user response”, is often overlooked in discussions about the viability of micropayments. But one astute observer, who would later go on to have a strong influence on the development of Bitcoin, was already thinking in depth about this problem. Nick Szabo, creator of the concept of smart contracts and Bitgold, wrote [“Micropayments and Mental Transaction Costs”](https://nakamotoinstitute.org/static/docs/micropayments-and-mental-transaction-costs.pdf) in 1999. Szabo states that the _primary_ reason for the failure of micropayments to take hold was not due to technological or overhead costs. It was due to the _mental transaction cost_ experienced by the user of having to decide whether a purchase was worth the price for every interaction on the internet.

> […] customer mental transaction costs are significant and ubiquitous, so much so that in real world circumstance cognitive costs usually well outweigh technological costs, and indeed technological resources are best applied towards the objective of reducing cognitive costs. […] Micropayment technology efforts which stress technological savings over cognitive savings will become irrelevant.

A web based on micropayments implies frequent purchases, which implies decision fatigue. It is likely the case that for most micropayments, the mental transaction cost incurred by having to make constant choices about purchases likely outweighs the value of what they’re paying for.

Large companies like Compaq and IBM, and startups like Pay2See, Millicent, iPin, and others, tried their hand at reducing these technological and mental transaction costs for micropayments in the early days, and it was still an assumption that the concept would be a lasting feature from the start.

Perhaps the most notable of these companies, which would go on to have a lasting impact on the Bitcoin community, was DigiCash, spearheaded by David Chaum. Chaum had already formalized many ideas for a [blockchain-like data structure](https://nakamotoinstitute.org/literature/computer-systems-by-mutually-suspicious-groups/) and [secure digital cash](https://nakamotoinstitute.org/literature/blind-signatures/) in 1982 before going on to found DigiCash in 1989. DigiCash implemented Chaum’s proposals, allowing users to withdraw money (called “eCash”) from a bank and make untraceable digital micropayments with it. Unfortunately, only one bank ever implemented eCash, and in 1998 the company went bankrupt.

Other micropayment efforts were also dissolving around the same time, and the W3C itself [closed their contributions to micropayment activity](https://www.w3.org/ECommerce/Micropayments/) in 1998.

The dot-com crash was in full swing, and micropayments was one of the ideas that crashed the hardest. It was a good time to be a critic. In 2000, writer Clay Shirky wrote [“The Case Against Micropayments”](http://mx.thirdvisit.co.uk/2002/10/04/theacaseaagainstamicropayments/) in which he boldly declared:

> Micropayment systems have not failed because of poor implementation; they have failed because they are a bad idea. Furthermore, since their weakness is systemic, they will continue to fail in the future.

His primary argument for their fundamental flaw was not technological or infrastructural — but instead echoed Nick Szabo one year prior: decision fatigue. He goes on:

> In particular, users want predictable and simple pricing. Micropayments, meanwhile, waste the users’ mental effort in order to conserve cheap resources, by creating many tiny, unpredictable transactions. Micropayments thus create in the mind of the user both anxiety and confusion, characteristics that users have not heretofore been known to actively seek out.

Shirky went on to predict three methods of payment that would become dominant on the web which did not suffer from the decision fatigue problem: aggregation (bundling low-value things into a single higher-value transaction), subscription, and subsidy (getting someone other than the user to pay for the content — today this has manifested itself as the ad model).

By the end of the dot-com crash, Shirky’s predictions were looking more salient. Credit cards, with their infrastructure costs prohibiting payments of less than $1, had become the de-facto method of payment, and passion for the micropayments project was losing steam. What was a self-evident and exciting prospect for the web’s future faded against the backdrop of its increasingly centralized, surveilled, and ad-driven predecessor — Web 2.0.

## Bitcoin and the Centralized Web

> We have to trust them with our privacy, trust them not to let identity thieves drain our accounts. Their massive overhead costs make micropayments impossible.

— Satoshi Nakamoto

> The idea driving 402 was that it’s obvious that support for payments should be a first-class concept on the web and it’s obvious that there should be a lot of direct commerce taking place on the web […] In fact, what emerged is a single dominant business model which is advertising. That leads to a lot of centralisation, because you get the highest cost per clicks and with the largest platforms.

— John Collison, President of Stripe

Satoshi Nakamoto released the Bitcoin whitepaper near the end of 2008, aptly timed in the midst of the U.S. Housing Crisis. He released the original code for it shortly after. Bitcoin was a massive breakthrough, both in the history of computer science and the history of money, and spurred a new wave of interest in the possibilities of the internet. For the first time, there was a permissionless way to transfer value with an _internet native_ currency, without all the inelegant, bloated infrastructure needed to use credit cards.

For awhile, the price of bitcoin was so small that some people did advocate its use for micropayment systems, despite Satoshi admitting that it wasn’t (yet) a great solution to that problem:

> Bitcoin isn't currently practical for very small micropayments. Not for things like pay per search or per page view without an aggregating mechanism, not things needing to pay less than 0.01.

But the limits imposed by fees didn’t stop people from dreaming about new possibilities enabled by it. Marc Andreessen, creator of the first popular web browser, [gave the examples](https://archive.nytimes.com/dealbook.nytimes.com/2014/01/21/why-bitcoin-matters/) of content monetization and fighting spam:

> One reason media businesses such as newspapers struggle to charge for content is because they need to charge either all (pay the entire subscription fee for all the content) or nothing (which then results in all those terrible banner ads everywhere on the web). All of a sudden, with Bitcoin, there is an economically viable way to charge arbitrarily small amounts of money per article, or per section, or per hour, or per video play, or per archive access, or per news alert.

This statement is not true today of course (at least, as far as Layer 1 is concerned), but the fees in 2014 were low enough that it was actually possible to build around the concept of micropayments. One interesting project built around this time was [Bitmonet](https://www.pcworld.com/article/447463/news-junkies-opensource-project-links-bitcoin-with-publishers.html), which allowed users to choose their subscription level by paying 10 cents for just one article, 15 cents for an hour of unlimited access to the website, or 20 cents for a day pass. Unfortunately transaction fees are [no longer low enough](https://bitinfocharts.com/comparison/bitcoin-transactionfees.html#alltime) to be able to allow for arbitrarily small micropayments, and although the issue was clearly on Satoshi’s mind from the earliest days of Bitcoin, it wasn’t designed to specifically address the micropayment problem.

### Subscriptions and Ads

Shirky’s predictions for content monetization were pretty accurate, particularly when it came to subscription and ad models.

In the ad model, content was subsidized by an advertiser, typically through a third-party. From 2014 to 2022, Google and Facebook essentially [held a duopoly](https://www.ft.com/content/4ff64604-a421-422c-9239-0ca8e5133042) over the online ad market as the third-party mediator between advertisers and content creators. The two companies (and in reality, most of big tech) [collected enormous amounts of personal information](https://www.security.org/resources/data-tech-companies-have/) and simply asked their users to entrust them with the safety of their data, despite numerous breaches. This [information is used](https://www.forbes.com/sites/forbestechcouncil/2022/02/16/what-does-big-tech-actually-do-with-your-data/?sh=6a79a424515f) to show targeted ads for products people are more likely to buy. Companies often refer to this model as “free — with ads”. But in reality, users do pay a price. The ad model forces users to trade two things in exchange for the content:

1. Their data, forcing them to give it to third parties, which, as Nick Szabo famously stated, are [security holes](https://nakamotoinstitute.org/literature/trusted-third-parties/).
2. Their attention. There is a reason for the phrase “pay attention”, and it’s well illustrated here. More time users spend on a site with ads, the more money advertisers, ad platforms, and the content creator makes. Thus a creator is economically incentivized to show as many ads as they possibly can without annoying the user so much that they leave the platform. The currency of the “free with ads” web is your attention. You are the product.

What’s clear in the ad model is that the _consumer_ becomes a second-class citizen. Since a layer of abstraction exists between a creator’s revenue and the end user, making a great user experience is not the highest priority. And as more and more [consumers use ad-blockers](https://backlinko.com/ad-blockers-users), content creators are forced to get more aggressive with ads, making using the web a more degraded experience for everyone.

Subscriptions also rose in popularity. Customers showed they were much more willing to pay for bulk access to licensed content like movies and music on a regular basis instead of paying to own individual songs. Although a more honest business model, they can also be very problematic when they are the sole option for payment. And in recent years, as these services become increasingly competitive, more and more people find themselves suffering from subscription fatigue. The inability to access just one (or a few) specific news articles, movies, or songs at any given time forces a suboptimal choice of trying to pay in bulk and optimize the most content for a given subscription.

Take streaming services, for example. Today there are so many streaming services, all battling for content licensing, that users end up paying multiple subscriptions to try to capture a greater subset of the movies and TV shows they want. But all they _really_ want is to watch an incredibly small subset of what’s offered by any given service. When they pick a service for a movie or show they want, it often doesn’t stay long, and will be bounced around unpredictably from company to company as licensing expires and gets updated.

News articles are another example. Companies like The New York Times or The Economist entice readers by allowing them to read just a few seconds of an article before blocking the content with a subscription paywall. Even more so with newspapers than with movies, customers are far more likely to want to pay a small amount for a single article of their choice than for a package deal to articles they don’t want.

While subscriptions offer a more straightforward approach than ads, using them in practice often makes for what is an increasingly costly and stressful management game.

When Clay Shirky was writing about the issues of mental transaction costs, he was writing before the mental costs of subscriptions and ads began to weigh down on people as they do today. Bitcoin gave a solution to the problem of an internet-native currency, but slow processing and high fees quickly became a prohibitive problem for a system supporting micropayments. One more major innovation was needed before true implementations of micropayments technology could take off.

## The Lightning Network

> A decentralized system is proposed whereby transactions are sent over a network of micropayment channels (a.k.a. payment channels or transaction channels) whose transfer of value occurs off-blockchain. — Joseph Poon and Thaddeus Dryja, The Bitcoin Lightning Network

In February 2015, [“The Bitcoin Lightning Network”](https://lightning.network/docs/) was published, representing perhaps the biggest advancement in Bitcoin since its inception. Through the clever use of Bitcoin properties, a series of payment “channels” could be constructed such that transactions did not have to be announced to the blockchain but could still retain the lack of trust in a third party, using the Bitcoin blockchain itself for dispute resolution. Payments can either be made directly between two channel partners, or they can be routed across a series of partners, so long as there exists a path of connected partners between sender and recipient. Because of this, it was no longer necessary to pay fees to miners for every transaction, and payments could be settled near-instantly. Since the primary reason micropayments weren’t viable on Bitcoin in the first place was due to high fees and slow transaction processing, the Lightning Network (abbreviated LN or called “lightning” for short) opened up a whole new world of possibilities that are just beginning to be explored.

### Methods

The smallest unit of bitcoin is a satoshi (often abbreviated to sat). One bitcoin is equal to 100,000,000 sat. At [current conversion rates](https://www.coinbase.com/converter/sats/usd), 1 satoshi is equal to $0.00023, meaning that the smallest payments that can be made (assuming no routing fees) are currently at a granularity of about _two ten-thousandths_ of a penny, a finer granularity than was ever seriously considered by the web’s early founders. Technically, even finer granularity payments of a thousandth of a satoshi (called millisatoshi, abbreviated msat) can be made within the confines of the Lightning Network, but any sub-satoshi amounts will be rounded down if the money is ever moved back to the blockchain. Therefore, all of the methods of payment discussed below can be used to make micropayments, but different mechanisms allow for a variety of [novel payment schemes](https://bitcoinmagazine.com/business/can-bitcoin-fix-micropayments) to be set up. I won’t go into the technical details of how the Lightning Network works here. My intention is to provide a high level overview of some ways micropayments can be made with it, and hopefully to spark people’s imaginations to the possibilities.

### Invoice

The most basic way to make a payment on the Lightning Network is through the [Bolt-11](https://www.bolt11.org/) invoice. This is an encoded string of information containing everything necessary for the payment to be made. The invoice is generated by the recipient and then sent to the payee. Typically, from a user’s perspective, the payment string is encoded as a QR code which the payee can scan.

_Benefits:_

- Least abstractions from a technological level
- Available by default in LN implementations
- Payments occur directly node to node

_Drawbacks:_

- A recipient having to first send an invoice can make for awkward UX
- Both nodes must be online for a payment to be made
- Invoices are non-reusable and must be freshly generated every time

Most of the ways to pay on LN today either simply use Bolt-11 invoices or some abstraction of them under the hood.

### Keysend

An alternative to invoices are [keysend](https://voltage.cloud/blog/bitcoin-lightning-network/keysend-payments-explained-voltage-technical-series/) payments, which allow for payments directly between two nodes without an invoice. Senders only need a node’s public key. One crucial downside to keysend is the lack of a proof of payment, making it unsuitable for merchants or other systems that rely on proof of purchase. For content monetization, however, keysend pairs nicely with the concept of [value4value](https://value4value.info/): a model which gives content away freely and asks the user to give back the value they felt they received in turn (and requires no proof of payment).

_Benefits:_

- No invoices required, payment can be sent instantly
- Available by default in LND, Eclair, and Core-Lightning (but must be manually turned on)
- Direct node to node payments

_Drawbacks:_

- No proof of payment limits scope of use

_Possible micropayment use cases:_

- Streaming sats (Boosting) while listening/watching/reading content
- Micro tipping
- [Boostagrams](https://podnews.net/article/how-to-earn-bitcoin-from-your-podcast)

_Examples:_

- [Podcast Index](https://podcastindex.org/)/Podcasting 2.0

### LNURL

[LNURL](https://github.com/lnurl/luds) is a set of standards designed to expand the capabilities of LN by providing a specification for “out-of-band” or third party communication between nodes. LNURL standardizes a whole set of LN-based interactions for developers. For example, the [LNURL-Pay](https://github.com/lnurl/luds/blob/luds/06.md) spec defines how services can create static QR codes that can be paid multiple times. Under the hood, the service is generating a new invoice every time a payment attempt is made.

_Benefits:_

- Static pay/withdrawal links
- LN based authentication schemes
- [Many more](https://github.com/lnurl/luds)

_Drawbacks:_

- LNURL operates “out-of-band” meaning that there is a service between LN nodes creating invoices on a node’s behalf. This can mean that the service must be trusted to stay online in addition to the nodes involved in the payment.

_Possible micropayment use cases:_

- Private, printable, reusable QR code for donations on content
- Reusability allows for payments to be made even when embedded in images and videos
- Withdrawals for content creators who’ve accumulated sats on a given platform
- Donations to protestors: Anyone can hold up a sign a protest movement captured on video, and sympathizers can easily donate. To quote Marc Andreessen from [“Why Bitcoin Matters”](https://a16z.com/2014/01/21/why-bitcoin-matters-nyt/) in 2014:
  > Think about the implications for protest movements. Today protesters want to get on TV so people learn about their cause. Tomorrow they’ll want to get on TV because that’s how they’ll raise money, by literally holding up signs that let people anywhere in the world who sympathize with them send them money on the spot. Bitcoin is a financial technology dream come true for even the most hardened anticapitalist political organizer.

_Examples:_

- [Cointrain](https://satoshkey.com/site/cointrain)
- [Lightning addresses](https://lightningaddress.com/)
- [List of Awesome LNURL things](https://github.com/lnurl/awesome-lnurl)

### LSAT

> Many speculate that [the 402 status code] was intended to be
> used by some sort of digital cash or micropayment scheme, which didn't yet
> exist at the time of the initial HTTP specification drafting.
>
> However, several decades later, we _do_ have a widely used digital cash system:
> Bitcoin! On top of that, a new network oriented around micropayments has also
> arisen: the Lightning Network.
>
> — Olaoluwa Osuntokun, [LSAT: Authentication and Payments for the Lightning-Native Web](https://lightning.engineering/posts/2020-03-30-lsat/)

[Lightning Service Authentication Tokens (LSATs)](https://lsat.tech/) are a protocol created for authentication and paid APIs that leverage the forgotten HTTP error code 402 discussed earlier in conjunction with the lightning network. LSATs can be thought of like reusable tickets that need to be paid for to gain access to a particular resource. But the powerful thing here is that _rules_ can be applied to modify access to resources on a given site, and the tickets can be reused on subsequent visits to the site.

_Benefits:_

- Extremely flexible
- Reusable
- Allows for highly granular and fine-grained access to digital resources
- Finally makes use of 402 error code!

_Drawbacks:_

- Difficult version control
- No current methods for efficient management (Could be solved by browser extension such as [Alby](https://github.com/getAlby/lightning-browser-extension/issues/9))
- Underutilized/underdeveloped despite being around for awhile

_Possible micropayment use cases:_

- Pay for single video/podcast/song/article and remember it on subsequent visits
- Metered subscriptions of your choice
- Custom expiration dates on content

_Examples:_

- [Aperture](https://docs.lightning.engineering/the-lightning-network/lsat/aperture)
- [Boltwall](https://medium.com/tierion/boltwall-middleware-for-lightning-payments-authorization-e3a1dbb54a4c)
- [lsat-js](https://github.com/Tierion/lsat-js)
- [Alby Mixtape](https://mixtape.albylabs.com/)
- [Nakaphoto](https://nakaphoto.vercel.app/)

### WebLN

[WebLN](https://www.webln.guide/introduction/readme) is a standard for abstracting away LN interactions by relying on a client (such as a browser extension) to communicate with a WebLN enabled site. The client must have the ability to interact with the user’s lightning node. For example, a site might use WebLN to request a payment from the user when a button is clicked. When clicked, the user’s client extension will popup, providing whatever payment details the WebLN enabled site sent to the client in a simple to use interface. WebLN greatly simplifies the payment flow for browser based interactions, where user’s no longer have to pull out their phones to make QR code based payments.

_Benefits:_

- Better UX
- Simple implementation
- No third party required
- Compatible with LNURL

_Drawbacks:_

- Browser client required
- Few clients in use
- If user doesn’t have a client installed, fallback options (such as LNURL or invoices) must be provided

_Possible micropayment use cases:_

- Anything an invoice, LNURL, or Keysend can do!

### Projects Using Micropayments

- [micropay.ai](https://micropay.ai/): Micropayments to generate images using DALLE-2
- [WebLN Experiments](https://webln.twentyuno.net/): A collection of various WebLN demos
- [LN VPN](https://lnvpn.net/): Pay as you go VPN service, pay as little as $0.1 for 1 hour
- [LNCal](https://lncal.com/): Allow people to pay you in bitcoin to schedule meetings
- [BTCMap](https://btcmap.org/): Map of locations accepting bitcoin. Uses Boosting for favored payments
- [Lightning Video](https://lightning.video/?type=top&nsfw=false&all=true): Like Youtube, but uses bitcoin micropayments instead of ads
- [Sats4Likes](https://www.sats4likes.com/): Get micropaid for micro tasks
- [PeerTube Lightning Plugin](https://p2ptube.us/): Pay PeerTube creators with LN
- [Stacker News](https://stacker.news/): Reddit-style discussions with micropayment tipping
- [Bookmark.org](https://bookmark.org/): Pay to archive links
- [THNDR Games](https://www.thndr.games/): Earn bitcoin while playing games

See [bolt.fun](http://bolt.fun), the [Lightning App Directory](https://dev.lightning.community/lapps/index.html), or [Lightning Landscape](https://www.lightning-landscape.net/projects) for a larger list of projects being built on Lightning.

## Conclusion

This article just scratches the surface of what’s possible with micropayments. While there are significant problems remaining, both technical and psychological, I hope the above examples show how far we’ve already come — how many things are possible now that _weren’t_ possible just a couple years ago. There is often a tendency for people, even (perhaps especially) technologists, to be skeptical of what’s possible with tech that hasn’t been invented yet. And while we need healthy skepticism, in my view, Bitcoin and the Lightning Network should be evidence in favor of a fundamentally optimistic outlook.

**Note:** I’m sure I made some mistakes writing this. If you find anything inaccurate, please let me know and I will update it.

Check out the [companion presentation](https://youtu.be/6Vq6foKst54) to this article I did as a workshop at [Voltage](https://voltage.cloud/)
