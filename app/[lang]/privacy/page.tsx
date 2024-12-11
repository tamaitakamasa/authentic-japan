// import Image from 'next/image';
import { ContentHeader } from '@/components/Layout/ContentHeader';
import { Locale } from '@/constants/site';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
	return (
		<>
			<ContentHeader title="PRIVACY POLICY" breadcrumbs={[{ label: 'HOME', href: '/' }, { label: 'PRIVACY POLICY' }]} lang={lang} />
			<div className="l-contents__body p-page p-page-privacy">
				<div className="p-page-privacy__content c-article">
					<h1>Authentic Japan利用規約</h1>

					<section>
						<h2>第1章 総則</h2>

						<section>
							<h3>第1条 (目的)</h3>
							<p>本利用規約は、Authentic Japan（以下「当社」という）が提供するプラットフォームサービス（以下「本サービス」という）の利用に関する条件を定めるものです。本サービスは、日本各地の深層に流れる地域の精神性と内面性を伝える体験を、ナビゲーターと利用者を繋ぐことで実現します。</p>
						</section>

						<section>
							<h3>第2条 (定義)</h3>
							<ol>
								<li>「ナビゲーター」とは、本サービスに登録し、体験プログラムを提供する個人または団体をいいます。</li>
								<li>「利用者」とは、本サービスを通じて体験プログラムを予約・参加する者をいいます。</li>
								<li>「体験プログラム」とは、ナビゲーターが提供する旅行、交流、学習に関する役務をいいます。</li>
							</ol>
						</section>

						<section>
							<h3>第3条 (サービスの内容)</h3>
							<ol>
								<li>当社は、ナビゲーターと利用者を電子的に仲介するプラットフォームを提供します。</li>
								<li>体験プログラムの企画、実施、管理はすべてナビゲーター自身の責任において行われます。</li>
							</ol>
						</section>
					</section>

					<section>
						<h2>第2章 会員登録</h2>

						<section>
							<h3>第4条 (利用登録)</h3>
							<ol>
								<li>本サービスの利用希望者（ナビゲーター、利用者）は、当社所定の方法により登録申請を行い、当社の審査を経て登録されるものとします。</li>
								<li>
									当社は、以下の各号のいずれかに該当する場合、登録を拒否することができます。
									<ol type="a">
										<li>虚偽の情報を提供した場合</li>
										<li>過去に本規約に違反した者である場合</li>
										<li>その他、当社が不適切と判断した場合</li>
									</ol>
								</li>
								<li>利用者は満18歳以上であることを要します。18歳未満の場合は法定代理人の同意を必要とします。</li>
							</ol>
						</section>
					</section>

					<section>
						<h2>第3章 責任と免責</h2>

						<section>
							<h3>第5条 (ナビゲーターの責任)</h3>
							<ol>
								<li>
									ナビゲーターは、提供する体験プログラムについて以下の責任を負います。
									<ol type="a">
										<li>安全管理</li>
										<li>正確な情報提供</li>
										<li>利用者との契約履行</li>
										<li>事故発生時の対応</li>
									</ol>
								</li>
								<li>ナビゲーターは、旅行業法その他の関連法規を遵守するものとします。</li>
							</ol>
						</section>

						<section>
							<h3>第6条 (当社の免責)</h3>
							<ol>
								<li>当社は、体験プログラムの内容、実施、結果について一切の責任を負いません。</li>
								<li>体験プログラムに起因する損害について、当社は賠償する義務を負いません。</li>
								<li>ナビゲーターと利用者間の紛争については、当社は一切関与しません。</li>
								<li>本サービスは現状有姿で提供され、特定の目的への適合性を保証するものではありません。</li>
							</ol>
						</section>

						<section>
							<h3>第7条 (損害賠償)</h3>
							<ol>
								<li>利用者またはナビゲーターが本サービスの利用に関して第三者に損害を与えた場合、自己の責任と費用において解決するものとします。</li>
								<li>当社の損害賠償責任は、法令で許容される限り3万円を上限とし、直接かつ現実に被った損害の範囲に限られます。ただし、当社の故意または重過失による場合はこの限りではありません。</li>
							</ol>
						</section>
					</section>

					<section>
						<h2>第4章 個人情報保護</h2>

						<section>
							<h3>第8条 (個人情報の取り扱い)</h3>
							<ol>
								<li>当社は、本サービスを通じて取得する個人情報を、別途定める「個人情報保護方針」に従い適切に管理します。</li>
								<li>
									当社は、以下の目的で個人情報を利用することがあります：
									<ol type="a">
										<li>サービス提供および運営</li>
										<li>ナビゲーターと利用者のマッチング</li>
										<li>サービス改善のための分析</li>
										<li>お客様への連絡および情報提供</li>
									</ol>
								</li>
								<li>
									当社は、以下の各号に定める場合、利用者およびナビゲーターの同意を得たうえで、個人情報を第三者に提供することがあります：
									<ol type="a">
										<li>体験プログラムの予約および管理のために必要な場合</li>
										<li>法令に基づき開示を求められた場合</li>
										<li>人の生命、身体または財産の保護のために必要な場合</li>
									</ol>
								</li>
								<li>当社は、利用者およびナビゲーターの利用履歴を、サービス品質向上およびマッチング精度の改善のために分析することがあります。</li>
								<li>前項の分析により得られた情報は、個人を特定できない形式に加工した上で利用するものとします。</li>
							</ol>
						</section>
					</section>

					<section>
						<h2>第5章 その他</h2>

						<section>
							<h3>第9条 (規約の変更)</h3>
							<ol>
								<li>当社は、必要に応じて本規約を変更できるものとします。</li>
								<li>規約変更時は、当社所定の方法により通知するものとします。</li>
							</ol>
						</section>

						<section>
							<h3>第10条 (準拠法・管轄)</h3>
							<p>本規約は日本法に準拠し、本サービスに関する紛争は、当社の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。</p>
						</section>
					</section>

					<section>
						<p className="p-page-privacy__appendix">附則 この利用規約は、2024年12月26日から施行します。</p>
					</section>

					<section className="p-page-privacy__law">
						<h2>特定商取引法に基づく表記</h2>
						<dl>
							<div>
								<dt>事業者名</dt>
								<dd>株式会社次世代共創企画</dd>
							</div>
							<div>
								<dt>代表者名</dt>
								<dd>山中昌幸</dd>
							</div>
							<div>
								<dt>所在地</dt>
								<dd>兵庫県淡路市志筑1721-1</dd>
							</div>
							<div>
								<dt>電話番号</dt>
								<dd>0799-64-7766</dd>
							</div>
							<div>
								<dt>メールアドレス</dt>
								<dd>aj-info@awajilab.jp</dd>
							</div>
							<div>
								<dt>販売価格</dt>
								<dd>各商品ページに記載</dd>
							</div>
							<div>
								<dt>商品代金以外の必要料金</dt>
								<dd>各商品ページに記載</dd>
							</div>
							<div>
								<dt>代金支払時期</dt>
								<dd>各商品ページに記載 / 表示価格は消費税込</dd>
							</div>
							<div>
								<dt>サービス提供時期</dt>
								<dd>予約の利用日に提供</dd>
							</div>
							<div>
								<dt>契約申込の撤回または解除に関する事項</dt>
								<dd>各商品ページに記載</dd>
							</div>
						</dl>
					</section>
				</div>
			</div>
		</>
	);
}
